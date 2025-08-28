"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Brain, Award, Coffee } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  { label: "Projects Completed", value: 8, icon: Code },
  { label: "Years of Experience", value: 3, icon: Award },
  { label: "Technologies Mastered", value: 20, icon: Brain },
  { label: "Performance Improvements", value: 45, icon: Coffee },
]

export function AboutSection() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          stats.forEach((stat, index) => {
            let current = 0
            const increment = stat.value / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
              }
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = Math.floor(current)
                return newStats
              })
            }, 30)
          })
        }
      },
      { threshold: 0.3 },
    )

    const section = document.getElementById("about")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Senior Software Engineer with 3+ years of experience at Decimal Point Analytics, building scalable financial
            platforms and data visualization tools. Currently pursuing MS in Computer Science at USC.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="bg-card border-border text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {animatedStats[index]}
                    {stat.label === "Performance Improvements" && "%"}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group">
              <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <GraduationCap className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Education</h3>
                <p className="text-muted-foreground">
                  MS in Computer Science, USC (Expected 2027)
                  <br />
                  BE in Information Technology, Mumbai (GPA: 9.38/10)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Code className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Full-Stack Development
                </h3>
                <p className="text-muted-foreground">
                  Expert in React, Next.js, Vue.js, Python (FastAPI, Django, Flask), and modern database technologies
                  with proven track record of improving system performance by 30-45%.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Brain className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">AI & Research</h3>
                <p className="text-muted-foreground">
                  Published researcher in pose estimation and AI-driven dance learning platforms. Experience with
                  BlazePose, OpenPose, and interactive AI applications.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-primary">My Approach</h3>
                <blockquote className="text-muted-foreground italic leading-relaxed mb-6">
                  "I focus on building scalable solutions that drive measurable business impact, from improving data
                  visualization speed by 45% to reducing manual workflows by 15+ hours per month."
                </blockquote>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Performance-driven development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Cross-functional collaboration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Agile methodology expertise</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
