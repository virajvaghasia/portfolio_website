import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            3+ years of professional experience building scalable financial platforms and data visualization tools
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Senior Software Engineer</CardTitle>
                    <p className="text-primary font-medium">Decimal Point Analytics, Mumbai</p>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Jul 2022 - Jul 2025
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Built real-time financial index platform</strong> improving data visualization speed by 45%
                    and boosting user engagement through dynamic multi-index tracking (React, FastAPI, Recharts)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Developed quality control system</strong> with maker-checker process increasing data
                    accuracy by 60% and shortening review cycle time by 40% (Django, DataTables)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Led frontend development</strong> of Loan Management System automating transaction workflows
                    and saving analysts 15+ hours/month (Vue.js, ApexCharts)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Implemented dynamic ESG questionnaire portal</strong> with drag-and-drop interface and
                    role-based workflows cutting onboarding time by 30% (Next.js, FastAPI)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Engineered matchmaking platform</strong> connecting ophthalmic startups with investors
                    saving over 20 hours/month of manual outreach (React, MySQL)
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    <strong>Optimized legacy codebases</strong> by refactoring modules and improving queries, boosting
                    performance by 30%, lowering bug backlog by 40%, and increasing sprint efficiency by 25%
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">Vue.js</Badge>
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">Django</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">MySQL</Badge>
                <Badge variant="secondary">Recharts</Badge>
                <Badge variant="secondary">ApexCharts</Badge>
                <Badge variant="secondary">CI/CD</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
