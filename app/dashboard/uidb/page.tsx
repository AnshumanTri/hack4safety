"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockUIDBs } from "@/lib/mock-data"
import { Plus, Search, Eye, Filter, MapPin, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UIDBPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredUIDBs = mockUIDBs.filter((uidb) => {
    const matchesSearch =
      uidb.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uidb.foundLocation.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || uidb.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unidentified Dead Bodies</h1>
          <p className="text-muted-foreground mt-1">View and manage all UIDB records</p>
        </div>
        <Link href="/dashboard/uidb/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Report UIDB
          </Button>
        </Link>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by case number or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Unidentified">Unidentified</SelectItem>
                <SelectItem value="Matched">Matched</SelectItem>
                <SelectItem value="Identified">Identified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredUIDBs.length > 0 ? (
          filteredUIDBs.map((uidb) => (
            <Card key={uidb.id} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 bg-muted shrink-0 relative">
                    <img
                      src={uidb.photos[0] || "/placeholder.svg"}
                      alt={uidb.caseNumber}
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <AlertTriangle className="h-8 w-8 text-warning" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{uidb.caseNumber}</h3>
                        <p className="text-muted-foreground">Unidentified Dead Body</p>
                      </div>
                      <Badge variant={uidb.status === "Unidentified" ? "destructive" : "secondary"}>
                        {uidb.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>Condition: {uidb.condition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Found: {uidb.foundDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{uidb.foundLocation.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Clothing:</span>
                        <span className="line-clamp-1">{uidb.clothing}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/dashboard/uidb/${uidb.id}`}>
                        <Button size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/dashboard/uidb/${uidb.id}/matches`}>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          View AI Matches
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No UIDB records found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
