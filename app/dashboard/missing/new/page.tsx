"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewMissingPersonPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    clothing: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    firNumber: "",
    reportedBy: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    router.push("/dashboard/missing")
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/missing">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Missing Person</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to register a new missing person case</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic details about the missing person</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Photo Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                  <Input id="photo" type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Last Seen Information</CardTitle>
              <CardDescription>Details about when and where the person was last seen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastSeenDate">Last Seen Date *</Label>
                  <Input
                    id="lastSeenDate"
                    type="date"
                    value={formData.lastSeenDate}
                    onChange={(e) => handleChange("lastSeenDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastSeenLocation">Last Seen Location *</Label>
                  <Input
                    id="lastSeenLocation"
                    placeholder="Enter location"
                    value={formData.lastSeenLocation}
                    onChange={(e) => handleChange("lastSeenLocation", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing Description *</Label>
                <Input
                  id="clothing"
                  placeholder="Describe what they were wearing"
                  value={formData.clothing}
                  onChange={(e) => handleChange("clothing", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>Official case details and reporting information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firNumber">FIR Number *</Label>
                  <Input
                    id="firNumber"
                    placeholder="FIR/YYYY/XXX"
                    value={formData.firNumber}
                    onChange={(e) => handleChange("firNumber", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By *</Label>
                  <Input
                    id="reportedBy"
                    placeholder="Relationship to missing person"
                    value={formData.reportedBy}
                    onChange={(e) => handleChange("reportedBy", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information that might help..."
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Missing Person Report"}
            </Button>
            <Link href="/dashboard/missing">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
