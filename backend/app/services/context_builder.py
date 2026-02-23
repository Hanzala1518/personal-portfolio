"""
backend/app/services/context_builder.py

Builds a clean, LLM-readable prompt string from resume_data.json.

Architecture
────────────
  _load_resume()          – reads & caches resume_data.json (once per process)
  _section_summary()      – owner identity + professional summary
  _section_skills()       – skill categories with comma-separated names
  _section_projects()     – project details including tech stack and features
  _section_certifications() – certification name, issuer, year, description
  _build_system_context() – assembles all sections (cached)
  build_prompt()          – public API: appends the user question and returns
                            the complete prompt as a single string
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any


# ── File path ─────────────────────────────────────────────────────────────

_DATA_PATH: Path = Path(__file__).parent.parent / "data" / "resume_data.json"


# ── Data loader ───────────────────────────────────────────────────────────

@lru_cache(maxsize=1)
def _load_resume() -> dict[str, Any]:
    """Read resume_data.json once and cache the result for the process lifetime."""
    with open(_DATA_PATH, "r", encoding="utf-8") as fh:
        return json.load(fh)


# ── Section builders ──────────────────────────────────────────────────────

def _section_summary(owner: dict[str, str]) -> str:
    """
    Return the identity + summary block.

    Example output:
        ## About Hanzala Saify
        Title   : AI Developer & Cybersecurity Enthusiast
        Email   : ...
        GitHub  : ...
        LinkedIn: ...

        Summary
        -------
        Full-stack software engineer ...
    """
    lines = [
        f"## About {owner['name']}",
        f"Title   : {owner.get('title', '')}",
        f"Email   : {owner.get('email', '')}",
        f"GitHub  : {owner.get('github', '')}",
        f"LinkedIn: {owner.get('linkedin', '')}",
        "",
        "Summary",
        "-------",
        owner.get("summary", ""),
    ]
    return "\n".join(lines)


def _section_skills(skills: list[dict[str, Any]]) -> str:
    """
    Return a concise skill-category block.

    Example output:
        ## Skills
        Programming Languages     : Python, JavaScript, TypeScript …
        AI, ML & Intelligent Systems: Generative AI, RAG …
    """
    if not skills:
        return ""

    # Align colons for readability
    max_len = max(len(cat["category"]) for cat in skills)
    lines   = ["## Skills"]
    for cat in skills:
        padding = " " * (max_len - len(cat["category"]))
        skill_list = ", ".join(cat["skills"])
        lines.append(f"{cat['category']}{padding}: {skill_list}")
    return "\n".join(lines)


def _section_projects(projects: list[dict[str, Any]]) -> str:
    """
    Return a detailed project block. Each project entry includes title, year,
    category, description, technologies, key features, and links.
    """
    if not projects:
        return ""

    blocks: list[str] = ["## Projects"]
    for p in projects:
        year     = p.get("year", "N/A")
        title    = p.get("title", "Untitled")
        category = p.get("category", "")

        entry: list[str] = [
            f"### {title}  [{year}]  —  {category}",
            p.get("description", ""),
        ]

        # Optional extended description
        if p.get("longDescription"):
            entry.append(f"Details: {p['longDescription']}")

        # Technologies
        tech = p.get("technologies", [])
        if tech:
            entry.append(f"Tech stack : {', '.join(tech)}")

        # Key features (bullet list)
        features = p.get("features", [])
        if features:
            entry.append("Key features:")
            entry.extend(f"  • {f}" for f in features)

        # Links
        if p.get("githubUrl"):
            entry.append(f"GitHub : {p['githubUrl']}")
        if p.get("liveUrl"):
            entry.append(f"Live   : {p['liveUrl']}")

        blocks.append("\n".join(entry))
        blocks.append("")  # blank line between projects

    return "\n".join(blocks).rstrip()


def _section_certifications(certifications: list[dict[str, Any]]) -> str:
    """
    Return a concise certification list.

    Example output:
        ## Certifications
        • AWS Academy Graduate – Cloud Architecting | AWS Academy (2025)
          Comprehensive training in designing scalable ...
    """
    if not certifications:
        return ""

    lines = ["## Certifications"]
    for cert in certifications:
        header = (
            f"• {cert.get('name', '')} "
            f"| {cert.get('issuer', '')} "
            f"({cert.get('year', '')})"
        )
        lines.append(header)
        desc = cert.get("description", "")
        if desc:
            lines.append(f"  {desc}")
    return "\n".join(lines)


# ── System context (cached) ────────────────────────────────────────────────

@lru_cache(maxsize=1)
def _build_system_context() -> str:
    """
    Assemble the full static system context from all resume sections.
    Cached after the first call — the JSON is parsed and formatted only once.

    Returns:
        A multi-section plain-text string suitable as the LLM system prompt.
    """
    data  = _load_resume()
    owner = data.get("owner", {})
    name  = owner.get("name", "the portfolio owner")

    # ── Persona + instructions ────────────────────────────────────────
    instructions = "\n".join([
        f"You are an AI assistant representing {name}'s professional portfolio.",
        f"Your role is to help recruiters and hiring managers learn about {name}.",
        "",
        "Guidelines:",
        "  1. Answer only from the resume data provided below — do not invent facts.",
        "  2. Be concise, professional, and enthusiastic about the candidate's work.",
        "  3. If a question falls outside the provided data, say so clearly.",
        "  4. Respond in plain text only — no markdown, no bullet symbols in replies.",
        "  5. Target 100–200 words per answer; expand only when explicitly asked.",
    ])

    divider = "=" * 60

    sections = [
        instructions,
        divider,
        _section_summary(owner),
        "",
        _section_skills(data.get("skills", [])),
        "",
        _section_projects(data.get("projects", [])),
        "",
        _section_certifications(data.get("certifications", [])),
        divider,
    ]

    return "\n".join(sections)


# ── Public API ─────────────────────────────────────────────────────────────

def build_prompt(
    user_question: str,
    *,
    history: list[dict[str, str]] | None = None,
) -> str:
    """
    Build the complete prompt string to be sent to the LLM.

    Concatenates the cached system context, an optional prior-turn history
    block, and the user's question into a single string, so the model
    receives full portfolio knowledge and conversation context.

    Args:
        user_question: The raw question from a recruiter or site visitor.
        history:       Optional list of prior turns, each a dict with
                       ``{"role": "user"|"assistant", "content": "..."}``.
                       Only the last 10 turns are included to keep the
                       prompt within the model's context window.

    Returns:
        A single, cleanly formatted prompt string containing:
          - AI persona and response instructions
          - Owner summary, skills, projects, certifications
          - Prior conversation turns (if any)
          - The current user question

    Example::

        prompt = build_prompt("What projects has Hanzala built?")
        # → full context + "\\n\\nUser question:\\nWhat projects has Hanzala built?"

        prompt = build_prompt(
            "Tell me more about MarketMuse AI",
            history=[{"role": "user", "content": "What projects has Hanzala built?"},
                     {"role": "assistant", "content": "..."}],
        )
    """
    parts: list[str] = [_build_system_context()]

    # ── Prior conversation turns ────────────────────────────────────────
    if history:
        turns = history[-10:]  # cap to stay within token budget
        history_lines: list[str] = ["## Conversation so far"]
        for turn in turns:
            role_label = "Recruiter" if turn["role"] == "user" else "Assistant"
            history_lines.append(f"{role_label}: {turn['content']}")
        parts.append("\n".join(history_lines))

    # ── Current question ───────────────────────────────────────────────
    parts.append(f"User question:\n{user_question.strip()}")

    return "\n\n".join(parts)
