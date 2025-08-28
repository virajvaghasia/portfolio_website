import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"

const publications = [
  {
    title: "Dance With AI – Interactive Dance Learning Platform",
    description:
      "Developed a web platform using Flask and MongoDB to teach dance to children with real-time video-to-video pose matching (BlazePose, OpenPose). Designed gamified feedback and leaderboard features using React, enhancing engagement and learning outcomes.",
    venue: "International Research Journal of Engineering and Technology (IRJET)",
    year: "Apr 2022",
    volume: "Vol 09, Issue 04",
    link: "https://drive.google.com/file/d/1sKdNW-qigeQgV_2Qjebdb8aYz-DqnJG9/view?usp=sharing",
  },
  {
    title: "Review of Literature on Human Pose Estimation and Pose Comparison Techniques",
    description:
      "Conducted a comprehensive literature survey on pose estimation methods relevant to sports analytics, providing insights into current techniques and future research directions in computer vision applications.",
    venue: "International Journal of Creative Research Thoughts (IJCRT)",
    year: "Oct 2021",
    volume: "Vol 09, Issue 10",
    link: "https://drive.google.com/file/d/1DhiEs84D53mY99VjcgasCgL1-q4mbEJN/view?usp=sharing",
  },
]

export function PublicationsSection() {
  return (
    <section id="publications" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Publications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Research contributions in AI, computer vision, and pose estimation
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {publications.map((publication, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-balance mb-2">{publication.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{publication.venue}</span>
                      <span>•</span>
                      <span>{publication.year}</span>
                      {publication.volume && (
                        <>
                          <span>•</span>
                          <span>{publication.volume}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{publication.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={publication.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Read Paper
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
