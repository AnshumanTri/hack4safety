"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockUIDBs } from "@/lib/mock-data"
import { ArrowLeft, MapPin, AlertTriangle, FileText, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function UIDBDetailPage() {
  const params = useParams()
  const uidb = mockUIDBs.find((u) => u.id === params.id) || mockUIDBs[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/uidb">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{uidb.caseNumber}</h1>
          <p className="text-muted-foreground mt-1">UIDB Case Details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-warning/10 border-2 border-warning/30 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-warning-foreground">Sensitive Forensic Material</p>
          <p className="text-sm text-warning-foreground/80 mt-1">
            This record contains sensitive forensic information. Access is logged and monitored.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Case Information</CardTitle>
                <Badge variant={uidb.status === "Unidentified" ? "destructive" : "secondary"}>{uidb.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Case Number</p>
                  <p className="text-lg font-medium">{uidb.caseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Body Condition</p>
                  <p className="text-lg font-medium">{uidb.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Found</p>
                  <p className="text-lg font-medium">{uidb.foundDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Post-Mortem</p>
                  <p className="text-lg font-medium">{uidb.postMortemReport || "Pending"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Clothing Description</p>
                <p className="text-base">{uidb.clothing}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Injuries & Distinguishing Marks</p>
                <p className="text-base">{uidb.injuries}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Found
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date Found</p>
                  <p className="text-lg font-medium">{uidb.foundDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Station ID</p>
                  <p className="text-lg font-medium">{uidb.stationId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Address</p>
                <p className="text-base">{uidb.foundLocation.address}</p>
              </div>

              <div className="bg-muted rounded-lg p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Coordinates: {uidb.foundLocation.lat}, {uidb.foundLocation.lng}
                </p>
                <Button variant="link" className="mt-2">
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Forensic Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {uidb.photos.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden border-2 relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`${uidb.caseNumber} photo ${index + 1}`}
                    className="w-full aspect-square object-cover blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center text-white">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-xs">Sensitive Content</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Add More Photos
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/dashboard/uidb/${uidb.id}/matches`} className="block">
                <Button variant="default" className="w-full gap-2">
                  View AI Matches
                </Button>
              </Link>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                View Post-Mortem Report
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Generate Case Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
