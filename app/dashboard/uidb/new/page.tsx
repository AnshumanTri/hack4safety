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
import { Upload, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NewUIDBPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    caseNumber: "",
    condition: "",
    clothing: "",
    injuries: "",
    foundLocation: "",
    foundDate: "",
    postMortemAvailable: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    router.push("/dashboard/uidb")
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/uidb">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report UIDB</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to register a new UIDB case</p>
        </div>
      </div>

      <div className="bg-warning/10 border-2 border-warning/30 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-warning-foreground">Sensitive Information</p>
          <p className="text-sm text-warning-foreground/80 mt-1">
            This form contains sensitive forensic information. Please ensure all details are accurate and handle with
            appropriate care.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>Basic details about the UIDB case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">Case Number *</Label>
                <Input
                  id="caseNumber"
                  placeholder="UIDB/YYYY/XXX"
                  value={formData.caseNumber}
                  onChange={(e) => handleChange("caseNumber", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foundDate">Date Found *</Label>
                  <Input
                    id="foundDate"
                    type="date"
                    value={formData.foundDate}
                    onChange={(e) => handleChange("foundDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundLocation">Location Found *</Label>
                  <Input
                    id="foundLocation"
                    placeholder="Enter location"
                    value={formData.foundLocation}
                    onChange={(e) => handleChange("foundLocation", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Forensic Photos Upload</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB (Multiple files supported)</p>
                  <Input id="photo" type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Physical Details</CardTitle>
              <CardDescription>Forensic observations and physical description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Body Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleChange("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fresh">Fresh</SelectItem>
                    <SelectItem value="Decomposed">Decomposed</SelectItem>
                    <SelectItem value="Severely Decomposed">Severely Decomposed</SelectItem>
                    <SelectItem value="Skeletal">Skeletal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing Description *</Label>
                <Input
                  id="clothing"
                  placeholder="Describe clothing and accessories"
                  value={formData.clothing}
                  onChange={(e) => handleChange("clothing", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="injuries">Visible Injuries/Marks</Label>
                <Textarea
                  id="injuries"
                  placeholder="Describe any visible injuries, tattoos, birthmarks, or distinguishing features..."
                  value={formData.injuries}
                  onChange={(e) => handleChange("injuries", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Forensic Reports</CardTitle>
              <CardDescription>Post-mortem and other forensic documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postMortemAvailable">Post-Mortem Report Status *</Label>
                <Select
                  value={formData.postMortemAvailable}
                  onValueChange={(value) => handleChange("postMortemAvailable", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Not Required">Not Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional forensic or investigative information..."
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit UIDB Report"}
            </Button>
            <Link href="/dashboard/uidb">
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
