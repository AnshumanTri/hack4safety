"use client"

import { useEffect, useRef, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

interface HeatmapDataPoint {
  type: string
  lat: number
  lng: number
  count: number
  location: string
}

interface MapComponentProps {
  data: HeatmapDataPoint[]
  viewMode: string
}

export function MapComponent({ data, viewMode }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center space-y-4">
          <Spinner className="h-8 w-8 mx-auto" />
          <p className="text-sm text-muted-foreground">Loading 3D map visualization...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-destructive/10">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">Failed to load map</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={mapContainerRef} className="w-full h-full relative bg-muted">
      {/* Placeholder for Deck.gl/Mapbox visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-card border-2 rounded-lg max-w-md">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">3D Map Visualization</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Interactive 3D heatmap showing {data.length} regions with {viewMode} view enabled
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
            <div className="bg-muted p-3 rounded">
              <p className="text-muted-foreground">Missing</p>
              <p className="text-xl font-bold text-primary">
                {data.filter((d) => d.type === "missing").reduce((sum, d) => sum + d.count, 0)}
              </p>
            </div>
            <div className="bg-muted p-3 rounded">
              <p className="text-muted-foreground">UIDB</p>
              <p className="text-xl font-bold text-destructive">
                {data.filter((d) => d.type === "uidb").reduce((sum, d) => sum + d.count, 0)}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Note: Deck.gl integration would render an actual 3D columnar heatmap with real-time interactions
          </p>
        </div>
      </div>
    </div>
  )
}
