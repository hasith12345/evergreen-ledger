"use client"

import type React from "react"
import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, TrendingUp, Package, Clock, CreditCard, X, Eye, Plus, User } from "lucide-react"

const recentCollections = [
  {
    id: 1,
    time: "09:45 AM",
    supplier: "K. Perera",
    grossWeight: 125.5,
    waterContent: 12.5,
    netWeight: 110.4,
    grade: "Grade A",
    status: "Completed",
  },
  {
    id: 2,
    time: "08:30 AM",
    supplier: "S. Ahmed",
    grossWeight: 98.2,
    waterContent: 14.2,
    netWeight: 84.3,
    grade: "Grade B",
    status: "Completed",
  },
  {
    id: 3,
    time: "07:15 AM",
    supplier: "R. Silva",
    grossWeight: 156.8,
    waterContent: 11.8,
    netWeight: 138.2,
    grade: "Grade A",
    status: "Completed",
  },
  {
    id: 4,
    time: "06:00 AM",
    supplier: "K. Perera",
    grossWeight: 142.3,
    waterContent: 13.1,
    netWeight: 123.6,
    grade: "Grade A",
    status: "Completed",
  },
]

const frequentSuppliers = [
  { id: 1, name: "K. Perera" },
  { id: 2, name: "S. Ahmed" },
  { id: 3, name: "R. Silva" },
]

export default function ProcurementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [period, setPeriod] = useState("Today")
  const [pageSize, setPageSize] = useState(5)

  const [formData, setFormData] = useState({
    supplier: "",
    grossWeight: "",
    moistureContent: "",
    qualityGrade: "Grade A",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    setFormData({
      supplier: "",
      grossWeight: "",
      moistureContent: "",
      qualityGrade: "Grade A",
    })
  }

  const handleClearForm = () => {
    setFormData({
      supplier: "",
      grossWeight: "",
      moistureContent: "",
      qualityGrade: "Grade A",
    })
  }

  const handleUseCurrentHumidity = () => {
    try {
      const val = localStorage.getItem('evergreen_weather_humidity')
      if (val) {
        setFormData({ ...formData, moistureContent: val })
      } else {
        // no humidity available; leave as is
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }

  const calculateNetWeight = () => {
    const gross = Number.parseFloat(formData.grossWeight) || 0
    const moisture = Number.parseFloat(formData.moistureContent) || 0
    const netWeight = gross * (1 - moisture / 100)
    return netWeight.toFixed(2)
  }

  // filtering (search + period) — currently period is a timeframe selector;
  // search filters supplier name case-insensitively. When data includes dates
  // the period filter can be expanded to filter by date range.
  const filteredCollections = recentCollections.filter((c) =>
    c.supplier.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  // pagination helpers (use filteredCollections length)
  const totalItems = filteredCollections.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const current = Math.min(Math.max(1, currentPage), totalPages)
  const startIndex = (current - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const paginatedCollections = filteredCollections.slice(startIndex, endIndex)

  return (
    <LayoutWrapper>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Green Leaf Procurement</h1>
          <p className="text-muted-foreground">Digital Intake and Grading Interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card - Today's Collection */}
          <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">TODAY'S COLLECTION</p>
                <p className="text-3xl font-bold text-foreground mb-1">1,245 kg</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-primary">
                    <TrendingUp className="w-3 h-3" />
                    +12%
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </p>
                
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Card - Suppliers Today */}
          <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">SUPPLIERS TODAY</p>
                <p className="text-3xl font-bold text-foreground mb-1">24</p>
                <p className="text-xs text-muted-foreground">Active suppliers</p>
                
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          {/* Card - Avg Quality Score */}
          <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">AVG QUALITY SCORE</p>
                <p className="text-3xl font-bold text-foreground mb-1">8.4/10</p>
                <p className="text-xs text-muted-foreground">Grade A standard</p>
                
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Card - Pending Payments */}
          <Card className="p-6 border border-border bg-card hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">PENDING PAYMENTS</p>
                <p className="text-3xl font-bold text-foreground mb-1">Rs. 55,200</p>
                <p className="text-xs text-muted-foreground">3 suppliers</p>
                
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 border border-border bg-card mb-8">
          <h2 className="text-lg font-bold text-foreground mb-6">NEW COLLECTION ENTRY</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Supplier Selection */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-3">
                  SELECT SUPPLIER <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Choose Supplier...</option>
                  <option value="K. Perera">K. Perera</option>
                  <option value="S. Ahmed">S. Ahmed</option>
                  <option value="R. Silva">R. Silva</option>
                </select>
              </div>

              {/* Gross Weight */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-3">
                  GROSS WEIGHT (KG) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="000.00"
                  value={formData.grossWeight}
                  onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })}
                  className="bg-muted border-0"
                  required
                />
              </div>

              {/* Moisture Content */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-3">
                  MOISTURE CONTENT (%) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="00.00"
                  value={formData.moistureContent}
                  onChange={(e) => setFormData({ ...formData, moistureContent: e.target.value })}
                  className="bg-muted border-0"
                  required
                />
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleUseCurrentHumidity}
                    className="text-xs text-foreground/80 hover:text-foreground underline"
                  >
                    Use current humidity from weather
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Quality Grade */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-3">
                  QUALITY GRADE <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.qualityGrade}
                  onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Grade A">Select Grade</option>
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Grade C">Grade C</option>
                </select>
              </div>

              {/* Net Compensated Weight */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-3">NET COMPENSATED WEIGHT</label>
                <div className="px-4 py-2 bg-muted rounded-lg text-foreground font-semibold">
                  {calculateNetWeight()}KG
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-end gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold"
                >
                  Record Entry ✓
                </Button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleClearForm}
              className="w-full bg-muted hover:bg-primary/10 hover:text-primary text-foreground border-0 font-semibold"
            >
              Clear Form
            </Button>
          </form>
        </Card>

        <Card className="p-8 border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">RECENT COLLECTIONS</h2>
              <div className="flex items-center gap-3">
                {/* Search with clear button */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                    placeholder="Search by supplier"
                    aria-label="Search recent collections"
                    className="pl-10 pr-10 bg-muted border-0 text-sm shadow-sm rounded-lg"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-muted/60"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {/* Period selector - styled native select for accessibility */}
                <div className="relative">
                  <select
                    value={period}
                    onChange={(e) => { setPeriod(e.target.value); setCurrentPage(1) }}
                    aria-label="Filter timeframe"
                    className="appearance-none px-4 py-2 bg-muted border-0 rounded-lg text-sm text-foreground shadow-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6 rounded-md shadow-sm">
            <table className="min-w-full text-sm divide-y divide-border">
              <thead>
                <tr className="">
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Time</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Supplier</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Gross (kg)</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Water (%)</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Net (kg)</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Grade</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-left py-3 px-4 font-semibold text-foreground text-xs">Status</th>
                  <th className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm text-right py-3 px-4 font-semibold text-foreground text-xs"> </th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {paginatedCollections.map((collection, idx) => (
                  <tr
                    key={collection.id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/2"} hover:bg-muted/50`}>
                    <td className="py-3 px-4 text-foreground align-middle">{collection.time}</td>
                    <td className="py-3 px-4 text-foreground align-middle">{collection.supplier}</td>
                    <td className="py-3 px-4 text-foreground align-middle">{collection.grossWeight}</td>
                    <td className="py-3 px-4 text-foreground align-middle">{collection.waterContent}</td>
                    <td className="py-3 px-4 text-foreground align-middle">{collection.netWeight}</td>
                    <td className="py-3 px-4 align-middle">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        collection.grade.includes("A") ? "bg-primary/10 text-primary" : collection.grade.includes("B") ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                      }`}>
                        {collection.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        collection.status === "Completed" ? "bg-primary/10 text-primary" : collection.status === "Pending" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      }`}>
                        {collection.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right align-middle">
                      <Button size="sm" variant="outline" className="bg-transparent flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">Showing {startIndex + 1} - {endIndex} of {totalItems} entries</div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows:</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1) }}
                  className="appearance-none px-3 py-1 bg-muted rounded-lg text-sm text-foreground border-0"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>

              <nav className="flex items-center gap-2" aria-label="Pagination">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="bg-transparent"
                >
                  First
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  const isActive = page === currentPage
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md text-sm ${isActive ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground hover:bg-muted/50'}`}
                      aria-current={isActive ? 'page' : undefined}
                    >{page}</button>
                  )
                })}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent"
                >
                  Last
                </Button>
              </nav>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">QUICK ACCESS - FREQUENT SUPPLIERS</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              

              
            </div>

            <div className="flex gap-4 overflow-x-auto py-2">
              {frequentSuppliers.map((supplier) => (
                <Card key={supplier.id} className="min-w-[200px] flex-shrink-0 px-4 py-3 border border-border bg-card hover:shadow-lg transition-shadow rounded-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {supplier.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">Recent: 1 entry • Avg 120 kg</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button size="sm" variant="ghost" className="text-foreground">View</Button>
                      
                    </div>
                  </div>
                </Card>
              ))}

              
                <Button variant="ghost" className="flex items-center gap-1 text-foreground">
                  View All
                </Button>
             
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
