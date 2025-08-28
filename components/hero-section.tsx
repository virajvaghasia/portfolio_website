"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const roles = ["Senior Software Engineer", "Full-Stack Developer", "AI Enthusiast", "USC Graduate Student"]

  useEffect(() => {
    const currentRole = roles[currentIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentIndex])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden pt-16"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 relative group">
              <img
                src="/mypic.png"
                alt="Viraj Vaghasia - Professional Photo"
                className="w-full h-full rounded-full object-cover shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 group-hover:opacity-0 transition-opacity duration-300"></div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Viraj Vaghasia
            </span>
          </h1>

          <div className="h-16 flex items-center justify-center mb-8">
            <p className="text-xl sm:text-2xl text-muted-foreground">
              <span className="text-accent font-semibold">{displayText}</span>
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>

          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Senior Software Engineer with 3+ years of experience building scalable web applications and data platforms.
            Currently pursuing MS in Computer Science at USC, passionate about creating innovative solutions that drive
            business impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-3 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Get In Touch
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 glass-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-primary/20 hover:border-primary/40 bg-transparent"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex justify-center space-x-6 pb-4">
            <a
              href="https://github.com/virajvaghasia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 transform p-2 rounded-full hover:bg-primary/10"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/viraj-vaghasia-242b6a245/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125 transform p-2 rounded-full hover:bg-accent/10"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
