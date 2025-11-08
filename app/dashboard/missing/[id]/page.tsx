"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockMissingPersons } from "@/lib/mock-data"
import { ArrowLeft, MapPin, FileText, Phone, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function MissingPersonDetailPage() {
  const params = useParams()
  const person = mockMissingPersons.find((p) => p.id === params.id) || mockMissingPersons[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/missing">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{person.name}</h1>
          <p className="text-muted-foreground mt-1">Missing Person Case Details</p>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Badge variant={person.status === "Active" ? "default" : "secondary"}>{person.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-lg font-medium">{person.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="text-lg font-medium">{person.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FIR Number</p>
                  <p className="text-lg font-medium">{person.firNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="text-lg font-medium">{person.reportedBy}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Clothing Description</p>
                <p className="text-base">{person.clothing}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Additional Notes</p>
                <p className="text-base">{person.notes}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Last Seen Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-lg font-medium">{person.lastSeenDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported On</p>
                  <p className="text-lg font-medium">{person.reportedDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Address</p>
                <p className="text-base">{person.lastSeenLocation.address}</p>
              </div>

              <div className="bg-muted rounded-lg p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Coordinates: {person.lastSeenLocation.lat}, {person.lastSeenLocation.lng}
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
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {person.photos.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden border-2">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`${person.name} photo ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
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
              <Link href={`/dashboard/missing/${person.id}/matches`} className="block">
                <Button variant="default" className="w-full gap-2">
                  View AI Matches
                </Button>
              </Link>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Phone className="h-4 w-4" />
                Contact Reporter
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
