"use client"

import { useState, useEffect, useMemo } from "react"
import { DeckGL } from "@deck.gl/react"
import { ColumnLayer } from "@deck.gl/layers"
import { MapView } from "@deck.gl/core"
import type { PickingInfo } from "@deck.gl/core"

interface HeatmapDataPoint {
  type: string
  lat: number
  lng: number
  count: number
  location: string
  state?: string
}

interface India3DMapProps {
  data: HeatmapDataPoint[]
  viewMode: "3d" | "2d"
}

const INITIAL_VIEW_STATE = {
  longitude: 78.9629,
  latitude: 20.5937,
  zoom: 4.5,
  pitch: 50,
  bearing: 0,
  minZoom: 3,
  maxZoom: 12,
}

export function India3DMap({ data, viewMode }: India3DMapProps) {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const layers = useMemo(() => {
    return [
      new ColumnLayer({
        id: "column-layer",
        data,
        diskResolution: 12,
        radius: 20000,
        extruded: true,
        pickable: true,
        elevationScale: viewMode === "3d" ? 5000 : 100,
        getPosition: (d: HeatmapDataPoint) => [d.lng, d.lat],
        getFillColor: (d: HeatmapDataPoint) => {
          return d.type === "missing" ? [59, 130, 246, 200] : [239, 68, 68, 200]
        },
        getLineColor: [255, 255, 255, 100],
        getElevation: (d: HeatmapDataPoint) => d.count,
        onHover: (info: PickingInfo) => setHoverInfo(info),
        updateTriggers: {
          getElevation: [data],
          getFillColor: [data],
          elevationScale: [viewMode],
        },
      }),
    ]
  }, [data, viewMode])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        views={new MapView({ repeat: false })}
        style={{ background: "hsl(var(--background))" }}
      >
        {/* Base map styling */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      </DeckGL>

      {/* Hover tooltip */}
      {hoverInfo && hoverInfo.object && (
        <div
          className="absolute pointer-events-none bg-card border-2 border-border rounded-lg px-3 py-2 shadow-xl text-sm z-50"
          style={{
            left: hoverInfo.x,
            top: hoverInfo.y,
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="font-bold">{hoverInfo.object.location}</div>
          {hoverInfo.object.state && <div className="text-xs text-muted-foreground">{hoverInfo.object.state}</div>}
          <div className="text-xs mt-1">
            {hoverInfo.object.type === "missing" ? "Missing Persons" : "UIDB Records"}:{" "}
            <span className="font-bold">{hoverInfo.object.count}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {hoverInfo.object.lat.toFixed(4)}°N, {hoverInfo.object.lng.toFixed(4)}°E
          </div>
        </div>
      )}

      {/* Controls legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur border-2 border-border rounded-lg px-4 py-3 text-xs space-y-2 shadow-lg pointer-events-none z-10">
        <div className="font-semibold text-foreground">Controls</div>
        <div className="text-muted-foreground space-y-1">
          <div>• Left-drag to rotate</div>
          <div>• Scroll to zoom in/out</div>
          <div>• Right-drag to pan</div>
          <div>• Hover columns for details</div>
        </div>
      </div>

      {/* View mode indicator */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur border-2 border-border rounded-lg px-3 py-2 text-xs shadow-lg pointer-events-none z-10">
        <div className="font-semibold">
          {viewMode === "3d" ? "3D View" : "2D View"} • {data.length} Locations
        </div>
      </div>
    </div>
  )
}
