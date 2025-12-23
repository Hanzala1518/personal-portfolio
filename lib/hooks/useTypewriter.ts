"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

interface TypewriterOptions {
  lines: string[]
  typingSpeed?: number
  holdDuration?: number
}

export function useTypewriter({ lines, typingSpeed = 45, holdDuration = 1600 }: TypewriterOptions) {
  const [currentLine, setCurrentLine] = useState(lines[0] ?? "")
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  const totalLines = useMemo(() => lines.length, [lines])

  const loop = useCallback(() => {
    const fullText = lines[lineIndex] ?? ""
    const nextText = isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1)

    setDisplayText(nextText)

    if (!isDeleting && nextText === fullText) {
      setTimeout(() => setIsDeleting(true), holdDuration)
    } else if (isDeleting && nextText === "") {
      setIsDeleting(false)
  setLineIndex((prev: number) => (prev + 1) % totalLines)
      setCurrentLine(lines[(lineIndex + 1) % totalLines] ?? "")
    }
  }, [displayText.length, holdDuration, isDeleting, lineIndex, lines, totalLines])

  useEffect(() => {
    const interval = setInterval(loop, isDeleting ? typingSpeed / 2 : typingSpeed)
    return () => clearInterval(interval)
  }, [loop, typingSpeed, isDeleting])

  return {
    text: displayText,
    currentLine,
    isComplete: displayText === currentLine && !isDeleting
  }
}
