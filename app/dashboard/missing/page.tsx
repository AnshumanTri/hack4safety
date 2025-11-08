"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockMissingPersons } from "@/lib/mock-data"
import { Plus, Search, Eye, Filter, MapPin, Calendar, User } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MissingPersonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPersons = mockMissingPersons.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.firNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || person.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Missing Persons</h1>
          <p className="text-muted-foreground mt-1">View and manage all missing person cases</p>
        </div>
        <Link href="/dashboard/missing/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Report Missing Person
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
                placeholder="Search by name or FIR number..."
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Matched">Matched</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredPersons.length > 0 ? (
          filteredPersons.map((person) => (
            <Card key={person.id} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 bg-muted shrink-0">
                    <img
                      src={person.photos[0] || "/placeholder.svg"}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{person.name}</h3>
                        <p className="text-muted-foreground">FIR: {person.firNumber}</p>
                      </div>
                      <Badge variant={person.status === "Active" ? "default" : "secondary"}>{person.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {person.age} years, {person.gender}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Last seen: {person.lastSeenDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{person.lastSeenLocation.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Clothing:</span>
                        <span className="line-clamp-1">{person.clothing}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/dashboard/missing/${person.id}`}>
                        <Button size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/dashboard/missing/${person.id}/matches`}>
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
              <p className="text-muted-foreground">No missing persons found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
