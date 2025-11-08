"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockMissingPersons, mockMatches, mockUIDBs } from "@/lib/mock-data"
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"

export default function MissingPersonMatchesPage() {
  const params = useParams()
  const person = mockMissingPersons.find((p) => p.id === params.id) || mockMissingPersons[0]
  const matches = mockMatches.filter((m) => m.missingPersonId === person.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/missing/${person.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Matches for {person.name}</h1>
          <p className="text-muted-foreground mt-1">Potential UIDB matches based on AI analysis</p>
        </div>
      </div>

      {matches.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">No matches found yet</p>
            <p className="text-muted-foreground mt-2">
              The AI system is continuously analyzing UIDB records for potential matches
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {matches.map((match) => {
            const uidb = mockUIDBs.find((u) => u.id === match.uidbId)
            if (!uidb) return null

            const getConfidenceBadge = (score: number) => {
              if (score >= 0.8) return { variant: "destructive" as const, label: "High Confidence" }
              if (score >= 0.6) return { variant: "default" as const, label: "Medium Confidence" }
              return { variant: "secondary" as const, label: "Low Confidence" }
            }

            const confidenceBadge = getConfidenceBadge(match.overallScore)

            return (
              <Card key={match.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Match with {uidb.caseNumber}
                        <Badge variant={confidenceBadge.variant}>{confidenceBadge.label}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Overall Match Score: {(match.overallScore * 100).toFixed(0)}%
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        match.status === "Confirmed" ? "default" : match.status === "Rejected" ? "secondary" : "outline"
                      }
                    >
                      {match.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Missing Person</h4>
                      <div className="flex gap-4">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2">
                          <img
                            src={person.photos[0] || "/placeholder.svg"}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Name:</strong> {person.name}
                          </p>
                          <p>
                            <strong>Age:</strong> {person.age} years
                          </p>
                          <p>
                            <strong>Gender:</strong> {person.gender}
                          </p>
                          <p>
                            <strong>Last Seen:</strong> {person.lastSeenDate}
                          </p>
                          <p>
                            <strong>Clothing:</strong> {person.clothing}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">UIDB Record</h4>
                      <div className="flex gap-4">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2">
                          <img
                            src={uidb.photos[0] || "/placeholder.svg"}
                            alt={uidb.caseNumber}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Case:</strong> {uidb.caseNumber}
                          </p>
                          <p>
                            <strong>Condition:</strong> {uidb.condition}
                          </p>
                          <p>
                            <strong>Found:</strong> {uidb.foundDate}
                          </p>
                          <p>
                            <strong>Location:</strong> {uidb.foundLocation.address}
                          </p>
                          <p>
                            <strong>Clothing:</strong> {uidb.clothing}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Match Analysis Scores</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Facial Recognition</span>
                          <span className="font-medium">{(match.faceScore * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={match.faceScore * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Metadata Match (Location, Date, etc.)</span>
                          <span className="font-medium">{(match.metadataScore * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={match.metadataScore * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Description Match (Clothing, etc.)</span>
                          <span className="font-medium">{(match.textScore * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={match.textScore * 100} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Matched Attributes</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.explanation.matchedAttributes.map((attr, index) => (
                        <Badge key={index} variant="outline">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="default" className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Confirm Match
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <XCircle className="h-4 w-4" />
                      Reject Match
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      View Full Comparison
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
