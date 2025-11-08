"use client"

import { DashboardStatsCards } from "@/components/dashboard-stats"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockStats, mockMatches, mockMissingPersons, mockUIDBs } from "@/lib/mock-data"
import { AlertCircle, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const recentCases = [
    { id: "1", type: "Missing", name: "Rahul Sharma", date: "2024-01-16", status: "Active" },
    { id: "2", type: "UIDB", name: "UIDB/2024/001", date: "2024-01-25", status: "Unidentified" },
    { id: "3", type: "Missing", name: "Priya Singh", date: "2024-01-21", status: "Active" },
  ]

  const highConfidenceMatches = mockMatches.filter((m) => m.overallScore >= 0.8)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of all missing person and UIDB cases</p>
      </div>

      <DashboardStatsCards stats={mockStats} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>High Confidence Matches</span>
              <Badge variant="destructive" className="ml-2">
                {highConfidenceMatches.length} Urgent
              </Badge>
            </CardTitle>
            <CardDescription>AI matches with confidence ≥ 80%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highConfidenceMatches.length > 0 ? (
              highConfidenceMatches.map((match) => {
                const mp = mockMissingPersons.find((p) => p.id === match.missingPersonId)
                const uidb = mockUIDBs.find((u) => u.id === match.uidbId)
                return (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border-2 border-destructive/20"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium">
                          {mp?.name} ↔ {uidb?.caseNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Match confidence: {(match.overallScore * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                )
              })
            ) : (
              <p className="text-muted-foreground text-center py-4">No high confidence matches at this time</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Case Activity
            </CardTitle>
            <CardDescription>Latest updates from your station</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={caseItem.type === "Missing" ? "default" : "secondary"}>{caseItem.type}</Badge>
                    <div>
                      <p className="font-medium text-sm">{caseItem.name}</p>
                      <p className="text-xs text-muted-foreground">{caseItem.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for case management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Link href="/dashboard/missing">
              <Button className="w-full bg-transparent" variant="outline">
                Report Missing Person
              </Button>
            </Link>
            <Link href="/dashboard/uidb">
              <Button className="w-full bg-transparent" variant="outline">
                Report UIDB
              </Button>
            </Link>
            <Link href="/dashboard/heatmap">
              <Button className="w-full bg-transparent" variant="outline">
                View Heatmap
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button className="w-full bg-transparent" variant="outline">
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
