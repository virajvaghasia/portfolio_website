"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const projects = [
  {
    title: "Dance With AI - Interactive Dance Learning Platform",
    description:
      "Web platform using Flask and MongoDB to teach dance to children with real-time video-to-video pose matching using BlazePose and OpenPose. Features gamified feedback and leaderboard system to enhance engagement and learning outcomes.",
    technologies: ["Flask", "MongoDB", "BlazePose", "OpenPose", "React", "Computer Vision", "Python"],
    category: "AI/ML",
    image: "/ai-task-manager-dashboard.png",
    featured: true,
    date: "Apr 2022",
    github: "https://github.com/virajvaghasia/dance-with-ai",
    demo: "https://dance-with-ai.vercel.app",
  },
  {
    title: "Fab Fashion - E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with Flask backend and integrated Razorpay API for secure payment processing. Implemented comprehensive product browsing, order management, and transaction workflows.",
    technologies: ["Flask", "Razorpay API", "Python", "SQLite", "HTML/CSS", "JavaScript"],
    category: "Web Development",
    image: "/modern-ecommerce-platform.png",
    featured: true,
    date: "Aug 2020",
    github: "https://github.com/virajvaghasia/fab-fashion",
    demo: "https://fab-fashion-demo.vercel.app",
  },
]

const categories = ["All", "AI/ML", "Web Development"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Development Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Innovative applications combining AI, web development, and real-world problem solving
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300 hover:scale-105"
            >
              <Filter className="mr-2 h-4 w-4" />
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  {project.featured && (
                    <Badge className="bg-primary/90 text-primary-foreground border-primary/20 backdrop-blur-sm">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                    {project.date}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-balance group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                    {project.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-pretty text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className={`text-xs transition-all duration-300 ${
                        hoveredProject === index ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* 
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent hover:scale-105 transition-transform"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 hover:scale-105 transition-transform" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
                */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
