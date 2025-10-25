"use client"

import type React from "react"
import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

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

  return (
    <LayoutWrapper>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Green Leaf Procurement</h1>
          <p className="text-muted-foreground">Digital Intake and Grading Interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border border-border bg-card">
            <p className="text-xs font-semibold text-muted-foreground mb-2">TODAY'S COLLECTION</p>
            <p className="text-3xl font-bold text-foreground mb-1">1,245 kg</p>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-xs font-semibold text-muted-foreground mb-2">SUPPLIERS TODAY</p>
            <p className="text-3xl font-bold text-foreground mb-1">24</p>
            <p className="text-xs text-muted-foreground">Active suppliers</p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-xs font-semibold text-muted-foreground mb-2">AVG QUALITY SCORE</p>
            <p className="text-3xl font-bold text-foreground mb-1">8.4/10</p>
            <p className="text-xs text-muted-foreground">Grade A standard</p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-xs font-semibold text-muted-foreground mb-2">PENDING PAYMENTS</p>
            <p className="text-3xl font-bold text-foreground mb-1">Rs. 55,200</p>
            <p className="text-xs text-muted-foreground">3 suppliers</p>
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
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                >
                  Recored Entry ✓
                </Button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleClearForm}
              variant="outline"
              className="w-full bg-gray-200 hover:bg-gray-300 text-foreground border-0 font-semibold"
            >
              Clear Form
            </Button>
          </form>
        </Card>

        <Card className="p-8 border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">RECENT COLLECTIONS</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="text" placeholder="Search" className="pl-10 bg-muted border-0 text-sm" />
              </div>
              <select className="px-4 py-2 bg-muted border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Gross(kg)</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Water(%)</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Net(kg)</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCollections.map((collection) => (
                  <tr key={collection.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{collection.time}</td>
                    <td className="py-3 px-4 text-foreground">{collection.supplier}</td>
                    <td className="py-3 px-4 text-foreground">{collection.grossWeight}</td>
                    <td className="py-3 px-4 text-foreground">{collection.waterContent}</td>
                    <td className="py-3 px-4 text-foreground">{collection.netWeight}</td>
                    <td className="py-3 px-4 text-foreground">{collection.grade}</td>
                    <td className="py-3 px-4 text-foreground">{collection.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 4 of 24 entries today</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="bg-gray-400 hover:bg-gray-500 text-white border-0"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-400 hover:bg-gray-500 text-white border-0"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">QUICK ACCESS - FREQUENT SUPPLIERS</h2>
          <div className="flex items-center gap-4">
            {frequentSuppliers.map((supplier) => (
              <Card key={supplier.id} className="px-6 py-4 border border-border bg-card">
                <p className="text-foreground font-semibold">{supplier.name}</p>
              </Card>
            ))}
            <Button variant="outline" className="bg-gray-400 hover:bg-gray-500 text-white border-0 font-semibold">
              View All
            </Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
