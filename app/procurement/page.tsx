"use client"

import type React from "react"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus } from "lucide-react"

const gradeRates = {
  A: 500,
  B: 350,
  C: 200,
}

const procurementRecords = [
  {
    id: 1,
    supplier: "Green Valley Farms",
    weight: 250,
    grade: "A",
    date: "2025-01-15",
    value: 125000,
  },
  {
    id: 2,
    supplier: "Mountain Tea Co",
    weight: 180,
    grade: "B",
    date: "2025-01-14",
    value: 63000,
  },
  {
    id: 3,
    supplier: "Sunrise Estates",
    weight: 320,
    grade: "A",
    date: "2025-01-13",
    value: 160000,
  },
]

export default function ProcurementPage() {
  const [formData, setFormData] = useState({
    supplier: "",
    weight: "",
    grade: "A",
    date: new Date().toISOString().split("T")[0],
  })
  const [records, setRecords] = useState(procurementRecords)

  const calculateValue = () => {
    const weight = Number.parseFloat(formData.weight) || 0
    const rate = gradeRates[formData.grade as keyof typeof gradeRates]
    return weight * rate
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRecord = {
      id: records.length + 1,
      supplier: formData.supplier,
      weight: Number.parseFloat(formData.weight),
      grade: formData.grade,
      date: formData.date,
      value: calculateValue(),
    }
    setRecords([newRecord, ...records])
    setFormData({
      supplier: "",
      weight: "",
      grade: "A",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const totalValue = records.reduce((sum, record) => sum + record.value, 0)

  return (
    <LayoutWrapper>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leaf Procurement</h1>
          <p className="text-muted-foreground">Record and manage tea leaf collections</p>
        </div>

        {/* Collection Form */}
        <Card className="p-6 border border-border bg-card mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Record Collection</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Supplier Name</label>
                <Input
                  type="text"
                  placeholder="Select supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="A">Grade A (₹500/kg)</option>
                  <option value="B">Grade B (₹350/kg)</option>
                  <option value="C">Grade C (₹200/kg)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Value Calculation */}
            {formData.weight && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Calculated Value:</span>
                  <span className="text-2xl font-bold text-primary">₹{calculateValue().toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Record Collection
            </Button>
          </form>
        </Card>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Collections</p>
            <p className="text-3xl font-bold text-foreground">{records.length}</p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Weight</p>
            <p className="text-3xl font-bold text-primary">
              {records.reduce((sum, r) => sum + r.weight, 0).toLocaleString()} kg
            </p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Value</p>
            <p className="text-3xl font-bold text-secondary">₹{totalValue.toLocaleString()}</p>
          </Card>
        </div>

        {/* Records Table */}
        <Card className="p-6 border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Collection Records</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Weight (kg)</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Value</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{record.supplier}</td>
                    <td className="py-3 px-4 text-foreground">{record.weight}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.grade === "A"
                            ? "bg-primary/10 text-primary"
                            : record.grade === "B"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Grade {record.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{record.date}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">
                      ₹{record.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
