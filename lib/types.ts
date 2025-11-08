export type UserRole = "StationOfficer" | "ForensicOfficer" | "DistrictAdmin" | "StateAdmin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  station: string
  district: string
  state: string
}

export interface MissingPerson {
  id: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  photos: string[]
  clothing: string
  lastSeenLocation: {
    lat: number
    lng: number
    address: string
  }
  lastSeenDate: string
  firNumber: string
  reportedBy: string
  reportedDate: string
  notes: string
  status: "Active" | "Matched" | "Closed"
  stationId: string
}

export interface UIDB {
  id: string
  caseNumber: string
  photos: string[]
  condition: string
  clothing: string
  injuries: string
  foundLocation: {
    lat: number
    lng: number
    address: string
  }
  foundDate: string
  postMortemReport?: string
  status: "Unidentified" | "Matched" | "Identified"
  stationId: string
}

export interface Match {
  id: string
  missingPersonId: string
  uidbId: string
  overallScore: number
  faceScore: number
  metadataScore: number
  textScore: number
  status: "Suggested" | "Confirmed" | "Rejected" | "UnderReview"
  reviewedBy?: string
  reviewedDate?: string
  explanation: {
    matchedAttributes: string[]
    heatmapUrl?: string
  }
}

export interface DashboardStats {
  activeMissing: number
  uidbRecords: number
  aiMatchesSuggested: number
  confirmedMatches: number
  avgTimeToIdentify: number
}
