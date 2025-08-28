"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Cloud, Brain } from "lucide-react"
import { useState } from "react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "Vue.js", level: 85 },
      { name: "Redux/Zustand", level: 80 },
      { name: "Tailwind CSS/MUI", level: 90 },
      { name: "Ag-Grid/Recharts", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 85 },
      { name: "Flask", level: 80 },
      { name: "Node.js", level: 75 },
    ],
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "C++", level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "OracleDB", level: 80 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 },
      { name: "Jenkins", level: 75 },
      { name: "Git/Bitbucket", level: 90 },
    ],
  },
  {
    title: "Machine Learning",
    icon: Brain,
    skills: [
      { name: "OpenCV", level: 80 },
      { name: "BlazePose/OpenPose", level: 75 },
      { name: "Computer Vision", level: 75 },
      { name: "Pose Estimation", level: 80 },
    ],
  },
]

export function SkillsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        hoveredCard === index ? "bg-primary text-primary-foreground" : "bg-primary/10"
                      }`}
                    >
                      <IconComponent
                        className={`h-5 w-5 transition-colors duration-300 ${
                          hoveredCard === index ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: hoveredCard === index ? `${skill.level}%` : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
