"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Download, BarChart3, Activity, Clock, Target, Users } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsePie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

export default function AnalyticsPage() {
  // Mock data for charts
  const monthlyTrends = [
    { month: "Jan", missing: 45, uidb: 12, matches: 5 },
    { month: "Feb", missing: 52, uidb: 15, matches: 7 },
    { month: "Mar", missing: 48, uidb: 18, matches: 9 },
    { month: "Apr", missing: 61, uidb: 14, matches: 6 },
    { month: "May", missing: 55, uidb: 20, matches: 11 },
    { month: "Jun", missing: 67, uidb: 16, matches: 8 },
  ]

  const resolutionTimes = [
    { range: "0-7 days", count: 15 },
    { range: "7-14 days", count: 28 },
    { range: "14-30 days", count: 35 },
    { range: "30-60 days", count: 22 },
    { range: "60+ days", count: 18 },
  ]

  const matchAccuracy = [
    { name: "Confirmed Matches", value: 72, color: "hsl(var(--chart-3))" },
    { name: "False Positives", value: 18, color: "hsl(var(--chart-2))" },
    { name: "Under Review", value: 10, color: "hsl(var(--chart-4))" },
  ]

  const regionalData = [
    { region: "Delhi", cases: 247, matches: 45 },
    { region: "Mumbai", cases: 189, matches: 32 },
    { region: "Bangalore", cases: 156, matches: 28 },
    { region: "Chennai", cases: 134, matches: 21 },
    { region: "Kolkata", cases: 98, matches: 15 },
  ]

  const aiPerformance = [
    { week: "Week 1", accuracy: 78, suggestions: 12 },
    { week: "Week 2", accuracy: 82, suggestions: 15 },
    { week: "Week 3", accuracy: 85, suggestions: 18 },
    { week: "Week 4", accuracy: 88, suggestions: 22 },
  ]

  const keyMetrics = [
    {
      title: "AI Match Accuracy",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      description: "Confirmed vs suggested matches",
    },
    {
      title: "Avg. Resolution Time",
      value: "14.5 days",
      change: "-3.1 days",
      trend: "up",
      icon: Clock,
      description: "Time to identify cases",
    },
    {
      title: "Active Case Load",
      value: "336",
      change: "+12",
      trend: "down",
      icon: Activity,
      description: "Current open cases",
    },
    {
      title: "Match Success Rate",
      value: "34.2%",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      description: "Cases successfully resolved",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon
          const isPositive = metric.trend === "up"
          const TrendIcon = isPositive ? TrendingUp : TrendingDown

          return (
            <Card key={index} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={isPositive ? "default" : "secondary"}>{metric.change}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">AI Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="resolution">Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Case Trends
              </CardTitle>
              <CardDescription>Missing persons, UIDB records, and successful matches over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="missing"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    name="Missing Persons"
                  />
                  <Area
                    type="monotone"
                    dataKey="uidb"
                    stackId="2"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    name="UIDB Records"
                  />
                  <Area
                    type="monotone"
                    dataKey="matches"
                    stackId="3"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    name="Confirmed Matches"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Case Volume Comparison</CardTitle>
                <CardDescription>Missing persons vs UIDB records</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="missing" fill="hsl(var(--primary))" name="Missing" />
                    <Bar dataKey="uidb" fill="hsl(var(--destructive))" name="UIDB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Match Accuracy Distribution</CardTitle>
                <CardDescription>AI matching performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsePie>
                    <Pie
                      data={matchAccuracy}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {matchAccuracy.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsePie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                AI Performance Metrics
              </CardTitle>
              <CardDescription>Tracking accuracy and match suggestions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={aiPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Accuracy (%)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="suggestions"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Suggestions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Facial Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">92.3%</div>
                <p className="text-xs text-muted-foreground mt-1">Average confidence score</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Metadata Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">84.7%</div>
                <p className="text-xs text-muted-foreground mt-1">Location & time accuracy</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Text Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-4">78.5%</div>
                <p className="text-xs text-muted-foreground mt-1">Clothing match rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Regional Case Distribution
              </CardTitle>
              <CardDescription>Top 5 regions by case volume and match rate</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="hsl(var(--primary))" name="Total Cases" />
                  <Bar dataKey="matches" fill="hsl(var(--chart-3))" name="Matches" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Regional Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regionalData.map((region, index) => {
                  const matchRate = ((region.matches / region.cases) * 100).toFixed(1)
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.cases} total cases, {region.matches} matches
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{matchRate}%</p>
                        <p className="text-xs text-muted-foreground">Match rate</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolution" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Case Resolution Timeline
              </CardTitle>
              <CardDescription>Time taken to identify and resolve cases</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={resolutionTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--accent))" name="Number of Cases" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Resolution Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Fastest Resolution</span>
                  <span className="font-bold">2 days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Average Resolution</span>
                  <span className="font-bold">14.5 days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Cases &lt; 7 days</span>
                  <span className="font-bold">15 (12.7%)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="text-sm">Cases &gt; 60 days</span>
                  <span className="font-bold">18 (15.3%)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Efficiency Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>AI-Assisted Cases</span>
                    <Badge variant="default">78% faster</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cases with AI matches resolve 78% faster than manual investigation
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>High Confidence Matches</span>
                    <Badge variant="default">92% accuracy</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Matches with ≥80% confidence have 92% confirmation rate
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Officer Productivity</span>
                    <Badge variant="default">+45%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI assistance has increased case handling capacity by 45%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
