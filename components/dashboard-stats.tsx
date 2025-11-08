"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, FileText, Sparkles, CheckCircle, Clock } from "lucide-react"
import type { DashboardStats } from "@/lib/types"

interface StatsCardsProps {
  stats: DashboardStats
}

export function DashboardStatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      title: "Active Missing Cases",
      value: stats.activeMissing,
      icon: Users,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "UIDB Records Logged",
      value: stats.uidbRecords,
      icon: FileText,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "AI Matches Suggested",
      value: stats.aiMatchesSuggested,
      icon: Sparkles,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Confirmed Matches",
      value: stats.confirmedMatches,
      icon: CheckCircle,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Avg. Time to Identify (Days)",
      value: stats.avgTimeToIdentify,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
      isDecimal: true,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {statItems.map((item) => (
        <Card key={item.title} className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`rounded-lg p-2 ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{item.isDecimal ? item.value.toFixed(1) : item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
