import type { User, MissingPerson, UIDB, Match, DashboardStats } from "./types"

export const mockUser: User = {
  id: "1",
  name: "Inspector Rajesh Kumar",
  email: "rajesh.kumar@police.gov.in",
  role: "StationOfficer",
  station: "Connaught Place Police Station",
  district: "New Delhi",
  state: "Delhi",
}

export const mockStats: DashboardStats = {
  activeMissing: 247,
  uidbRecords: 89,
  aiMatchesSuggested: 34,
  confirmedMatches: 12,
  avgTimeToIdentify: 14.5,
}

export const mockMissingPersons: MissingPerson[] = [
  {
    id: "mp-001",
    name: "Rahul Sharma",
    age: 28,
    gender: "Male",
    photos: ["/indian-male-portrait.jpg"],
    clothing: "Blue jeans, white t-shirt",
    lastSeenLocation: {
      lat: 28.6139,
      lng: 77.209,
      address: "Connaught Place, New Delhi",
    },
    lastSeenDate: "2024-01-15",
    firNumber: "FIR/2024/001",
    reportedBy: "Family Member",
    reportedDate: "2024-01-16",
    notes: "Last seen near Metro Station",
    status: "Active",
    stationId: "station-001",
  },
  {
    id: "mp-002",
    name: "Priya Singh",
    age: 24,
    gender: "Female",
    photos: ["/indian-female-portrait.jpg"],
    clothing: "Red saree",
    lastSeenLocation: {
      lat: 28.7041,
      lng: 77.1025,
      address: "Rohini, New Delhi",
    },
    lastSeenDate: "2024-01-20",
    firNumber: "FIR/2024/002",
    reportedBy: "Family Member",
    reportedDate: "2024-01-21",
    notes: "Left home for work, never returned",
    status: "Active",
    stationId: "station-002",
  },
]

export const mockUIDBs: UIDB[] = [
  {
    id: "uidb-001",
    caseNumber: "UIDB/2024/001",
    photos: ["/forensic-photo.jpg"],
    condition: "Decomposed",
    clothing: "Blue jeans, white shirt",
    injuries: "Head trauma",
    foundLocation: {
      lat: 28.5355,
      lng: 77.391,
      address: "Noida Sector 62",
    },
    foundDate: "2024-01-25",
    postMortemReport: "Available",
    status: "Unidentified",
    stationId: "station-003",
  },
]

export const mockMatches: Match[] = [
  {
    id: "match-001",
    missingPersonId: "mp-001",
    uidbId: "uidb-001",
    overallScore: 0.85,
    faceScore: 0.92,
    metadataScore: 0.78,
    textScore: 0.75,
    status: "Suggested",
    explanation: {
      matchedAttributes: ["Facial features", "Clothing match", "Age range", "Location proximity"],
    },
  },
]

export const mockHeatmapData = [
  // Delhi NCR Region
  { type: "missing", lat: 28.6139, lng: 77.209, count: 24, location: "Central Delhi", state: "Delhi" },
  { type: "missing", lat: 28.7041, lng: 77.1025, count: 18, location: "North Delhi", state: "Delhi" },
  { type: "uidb", lat: 28.5355, lng: 77.391, count: 12, location: "Noida, UP", state: "Uttar Pradesh" },
  { type: "uidb", lat: 28.4595, lng: 77.0266, count: 8, location: "Gurgaon", state: "Haryana" },

  // Mumbai Region
  { type: "missing", lat: 19.076, lng: 72.8777, count: 32, location: "Mumbai Central", state: "Maharashtra" },
  { type: "uidb", lat: 19.1136, lng: 72.8697, count: 15, location: "Andheri, Mumbai", state: "Maharashtra" },
  { type: "missing", lat: 18.5204, lng: 73.8567, count: 21, location: "Pune", state: "Maharashtra" },

  // Bangalore Region
  { type: "missing", lat: 12.9716, lng: 77.5946, count: 28, location: "Bangalore", state: "Karnataka" },
  { type: "uidb", lat: 13.0827, lng: 80.2707, count: 11, location: "Chennai", state: "Tamil Nadu" },

  // Kolkata Region
  { type: "missing", lat: 22.5726, lng: 88.3639, count: 19, location: "Kolkata", state: "West Bengal" },
  { type: "uidb", lat: 22.3072, lng: 73.1812, count: 7, location: "Vadodara", state: "Gujarat" },

  // Hyderabad Region
  { type: "missing", lat: 17.385, lng: 78.4867, count: 16, location: "Hyderabad", state: "Telangana" },

  // Jaipur & Rajasthan
  { type: "missing", lat: 26.9124, lng: 75.7873, count: 14, location: "Jaipur", state: "Rajasthan" },
  { type: "uidb", lat: 24.5854, lng: 73.7125, count: 6, location: "Udaipur", state: "Rajasthan" },

  // Lucknow & UP
  { type: "missing", lat: 26.8467, lng: 80.9462, count: 22, location: "Lucknow", state: "Uttar Pradesh" },
  { type: "uidb", lat: 25.3176, lng: 82.9739, count: 9, location: "Varanasi", state: "Uttar Pradesh" },

  // Ahmedabad Region
  { type: "missing", lat: 23.0225, lng: 72.5714, count: 17, location: "Ahmedabad", state: "Gujarat" },

  // Chandigarh & Punjab
  { type: "missing", lat: 30.7333, lng: 76.7794, count: 13, location: "Chandigarh", state: "Chandigarh" },
  { type: "uidb", lat: 31.634, lng: 74.8723, count: 10, location: "Amritsar", state: "Punjab" },

  // Patna & Bihar
  { type: "missing", lat: 25.5941, lng: 85.1376, count: 15, location: "Patna", state: "Bihar" },

  // Bhopal Region
  { type: "uidb", lat: 23.2599, lng: 77.4126, count: 8, location: "Bhopal", state: "Madhya Pradesh" },

  // Guwahati & Northeast
  { type: "missing", lat: 26.1445, lng: 91.7362, count: 11, location: "Guwahati", state: "Assam" },
]
