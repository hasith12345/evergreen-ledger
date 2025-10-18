"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
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
import { TrendingUp, Package, Clock } from "lucide-react"

const dashboardData = [
  { month: "Jan", collected: 2400, processed: 1400 },
  { month: "Feb", collected: 3200, processed: 2100 },
  { month: "Mar", collected: 2800, processed: 1800 },
  { month: "Apr", collected: 3900, processed: 2800 },
  { month: "May", collected: 4200, processed: 3200 },
  { month: "Jun", collected: 3800, processed: 2900 },
]

const recentActivities = [
  { id: 1, supplier: "Green Valley Farms", weight: "250 kg", grade: "A", date: "2025-01-15" },
  { id: 2, supplier: "Mountain Tea Co", weight: "180 kg", grade: "B", date: "2025-01-14" },
  { id: 3, supplier: "Sunrise Estates", weight: "320 kg", grade: "A", date: "2025-01-13" },
  { id: 4, supplier: "Valley Harvest", weight: "150 kg", grade: "C", date: "2025-01-12" },
]

export default function DashboardPage() {
  return (
    <LayoutWrapper>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Leaf Collected</p>
                <p className="text-3xl font-bold text-foreground">24,580 kg</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Batches in Process</p>
                <p className="text-3xl font-bold text-foreground">18</p>
                <p className="text-xs text-secondary mt-2">Currently processing</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
                <p className="text-3xl font-bold text-foreground">₹2,45,000</p>
                <p className="text-xs text-destructive mt-2">12 suppliers awaiting</p>
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
          <div className="overflow-x-auto">
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
                {recentActivities.map((activity) => (
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
        </Card>
      </div>
    </LayoutWrapper>
  )
}
