"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockHeatmapData } from "@/lib/mock-data"
import { MapIcon, Layers, Users, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const India3DMap = dynamic(() => import("@/components/india-3d-map").then((mod) => mod.India3DMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <div className="text-muted-foreground">Loading 3D map...</div>
    </div>
  ),
})

export default function HeatmapPage() {
  const [dataFilter, setDataFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d")

  const filteredData = mockHeatmapData.filter((item) => {
    if (dataFilter === "all") return true
    return item.type === dataFilter
  })

  const stats = {
    totalMissing: mockHeatmapData.filter((d) => d.type === "missing").reduce((sum, d) => sum + d.count, 0),
    totalUIDB: mockHeatmapData.filter((d) => d.type === "uidb").reduce((sum, d) => sum + d.count, 0),
    hotspots: mockHeatmapData.filter((d) => d.count > 15).length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">India Heatmap</h1>
        <p className="text-muted-foreground mt-1">Geographical visualization of missing persons and UIDB cases</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Missing Persons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalMissing}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all regions</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              UIDB Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUIDB}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all regions</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapIcon className="h-4 w-4 text-accent" />
              Hotspot Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.hotspots}</div>
            <p className="text-xs text-muted-foreground mt-1">High concentration areas</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Interactive 3D Map
              </CardTitle>
              <CardDescription className="mt-2">
                Visualize case distribution across India with interactive controls
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={dataFilter} onValueChange={setDataFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="missing">Missing Only</SelectItem>
                  <SelectItem value="uidb">UIDB Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as "3d" | "2d")}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3d">3D View</SelectItem>
                  <SelectItem value="2d">2D View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border-2" style={{ height: "600px" }}>
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-muted-foreground">Initializing map...</div>
                </div>
              }
            >
              <India3DMap data={filteredData} viewMode={viewMode} />
            </Suspense>
          </div>

          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span>Missing Persons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              <span>UIDB Records</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Height indicates case count</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Regional Breakdown</CardTitle>
          <CardDescription>Case distribution by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHeatmapData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <MapIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{region.location}</p>
                    <p className="text-sm text-muted-foreground">
                      Lat: {region.lat.toFixed(4)}, Lng: {region.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={region.type === "missing" ? "default" : "destructive"}>
                    {region.type === "missing" ? "Missing" : "UIDB"}
                  </Badge>
                  <div className="text-right">
                    <p className="font-bold text-lg">{region.count}</p>
                    <p className="text-xs text-muted-foreground">cases</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
