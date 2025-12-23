export interface ProjectMetric {
  accuracy?: number
  responseTimeMs?: number
  coverage?: string
}

export interface ProjectLinks {
  demo?: string
  repo?: string
}

export interface ProjectOverviewSection {
  title: string
  body: string
}

export interface ProjectArchitectureItem {
  title: string
  description: string
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectMetricHighlight {
  label: string
  value: string
  caption: string
}

export interface ProjectCaseStudy {
  overview: ProjectOverviewSection[]
  architecture: {
    diagram: string
    stack: ProjectArchitectureItem[]
  }
  implementation: {
    steps: string[]
    features: ProjectFeature[]
  }
  results: {
    metrics: ProjectMetricHighlight[]
    impact: string
  }
  retrospective: {
    learned: string[]
    next: string[]
  }
}

export interface Project {
  slug: string
  title: string
  classification: string
  description: string
  heroImage: string
  tech: string[]
  tags: string[]
  links: ProjectLinks
  stats?: ProjectMetric
  caseStudy?: ProjectCaseStudy
}
