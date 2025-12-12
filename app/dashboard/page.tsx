"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Package, Clock, ChevronLeft, ChevronRight } from "lucide-react"

const dashboardData = [
  { month: "Jan", collected: 2400, processed: 1400 },
  { month: "Feb", collected: 3200, processed: 2100 },
  { month: "Mar", collected: 2800, processed: 1800 },
  { month: "Apr", collected: 3900, processed: 2800 },
  { month: "May", collected: 4200, processed: 3200 },
  { month: "Jun", collected: 3800, processed: 2900 },
]

const recentActivities = [
  { id: 1, supplier: "Sanath Nishantha", weight: "500 kg", grade: "A", date: "2025-01-15" },
  { id: 2, supplier: "Hashan Hewage", weight: "490 kg", grade: "B", date: "2025-01-14" },
  { id: 3, supplier: "Arul Suresh", weight: "780 kg", grade: "A", date: "2025-01-13" },
  { id: 4, supplier: "Sumana Nishanthi", weight: "1100 kg", grade: "A", date: "2025-01-12" },
  { id: 5, supplier: "Kusumlatha", weight: "562 kg", grade: "B", date: "2025-01-11" },
]

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // pagination helpers for recentActivities
  const totalItems = recentActivities.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const current = Math.min(Math.max(1, currentPage), totalPages)
  const startIndex = (current - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const paginatedActivities = recentActivities.slice(startIndex, endIndex)

  return (
    <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 md:p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Leaf Collected</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">24,580 kg</p>
                <p className="text-xs md:text-sm text-primary mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Batches in Process</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">18</p>
                <p className="text-xs md:text-sm text-secondary mt-2">Currently processing</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">Rs. 2,45,000</p>
                <p className="text-xs md:text-sm text-destructive mt-2">12 suppliers awaiting</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Collection Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Legend />
                <Line type="monotone" dataKey="collected" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="processed" stroke="var(--color-secondary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Grade Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { grade: "A", count: 45 },
                  { grade: "B", count: 32 },
                  { grade: "C", count: 18 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6 border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Collections</h2>

          {/* Mobile stacked list (visible on small screens) */}
          <div className="sm:hidden space-y-3">
            {paginatedActivities.map((activity) => (
              <div key={activity.id} className="p-3 border border-border rounded-lg bg-muted/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-foreground">{activity.supplier}</div>
                  <div className="text-xs text-muted-foreground">{activity.date}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-foreground">{activity.weight}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        activity.grade === "A"
                          ? "bg-primary/10 text-primary"
                          : activity.grade === "B"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      Grade {activity.grade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table view for sm+ screens */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Weight</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{activity.supplier}</td>
                    <td className="py-3 px-4 text-foreground">{activity.weight}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activity.grade === "A"
                            ? "bg-primary/10 text-primary"
                            : activity.grade === "B"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Grade {activity.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-4">
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

                {/* Desktop / tablet pagination */}
                <nav className="hidden sm:flex items-center gap-2" aria-label="Pagination">
                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="bg-transparent">First</Button>

                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="bg-transparent">
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

                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="bg-transparent">
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="bg-transparent">Last</Button>
                </nav>

                {/* Compact mobile pagination */}
                <div className="sm:hidden flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="bg-transparent">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-muted-foreground">Page {currentPage} / {totalPages}</div>
                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="bg-transparent">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
          </div>
        </Card>
      </div>
  )
}
