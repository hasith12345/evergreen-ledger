"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, CheckCircle, Clock, Check, XIcon } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'

const paymentRecords = [
  {
    id: 1,
    supplier: "Sanath Nishantha",
    amount: 100000,
    weight: 200,
    grade: "A",
    rate: 500,
    status: "Paid",
    date: "2025-01-15",
    phone: "0714442389",
  },
  {
    id: 2,
    supplier: "Hashan Hewage",
    amount: 95000,
    weight: 271,
    grade: "B",
    rate: 350,
    status: "Pending",
    date: "2025-01-14",
    phone: "0718890365",
  },
  {
    id: 3,
    supplier: "Arul Suresh",
    amount: 160000,
    weight: 320,
    grade: "A",
    rate: 500,
    status: "Pending",
    date: "2025-01-13",
    phone: "0766742389",
  },
  {
    id: 4,
    supplier: "Sumana Nishanthi",
    amount: 235400,
    weight: 470,
    grade: "A",
    rate: 500,
    status: "Paid",
    date: "2025-01-12",
    phone: "0723349512",
  },
  {
    id: 5,
    supplier: "Kusumlatha",
    amount: 102580,
    weight: 293,
    grade: "B",
    rate: 350,
    status: "Pending",
    date: "2025-01-11",
    phone: "0756088993",
  },
]

export default function PayrollPage() {
  const [payments, setPayments] = useState(paymentRecords)
  const [selectedPayment, setSelectedPayment] = useState<(typeof paymentRecords)[0] | null>(null)
  const { toast } = useToast()
  const [successOpen, setSuccessOpen] = useState(false)
  const [successTitle, setSuccessTitle] = useState<string | null>(null)
  const [successDescription, setSuccessDescription] = useState<string | null>(null)

  const handleMarkAsPaid = (id: number) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, status: "Paid" } : p)))
    const paid = payments.find((p) => p.id === id)
    if (paid) {
      // show centered success modal instead of toast
      setSuccessTitle('Payment transferred')
      setSuccessDescription(`Rs. ${paid.amount.toLocaleString()} has been transferred to ${paid.supplier}.`)
      setSuccessOpen(true)
    }
  }

  const handleSendSMS = (phone: string, amount: number) => {
    // show centered success modal instead of toast
    setSuccessTitle('SMS sent')
    setSuccessDescription(`SMS sent to ${phone}: Payment of Rs.${amount.toLocaleString()} has been processed.`)
    setSuccessOpen(true)
  }

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payroll Management</h1>
          <p className="text-muted-foreground">Manage supplier payments and notifications</p>
        </div>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-foreground">Rs. {totalAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">{payments.length} payments</p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Paid</p>
            <p className="text-3xl font-bold text-primary">Rs. {paidAmount.toLocaleString()}</p>
            <p className="text-xs text-primary mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {payments.filter((p) => p.status === "Paid").length} completed
            </p>
          </Card>
          <Card className="p-6 border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-destructive">Rs. {pendingAmount.toLocaleString()}</p>
            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {payments.filter((p) => p.status === "Pending").length} awaiting
            </p>
          </Card>
        </div>

        {/* Payment Calculation Section */}
        <Card className="p-6 border border-border bg-card mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Payment Calculation</h2>
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
            <div className="flex-1 flex justify-between items-center">
              <span className="text-foreground">Formula:</span>
              <span className="font-mono text-sm text-muted-foreground">Payment = Weight (kg) × Grade Rate (Rs/kg)</span>
            </div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-foreground">Grade A Rate:</span>
              <span className="font-semibold text-primary">Rs. 500/kg</span>
            </div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-foreground">Grade B Rate:</span>
              <span className="font-semibold text-secondary">Rs. 350/kg</span>
            </div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-foreground">Grade C Rate:</span>
              <span className="font-semibold text-muted-foreground">Rs. 200/kg</span>
            </div>
          </div>
        </Card>

        {/* Payments Table */}
        <Card className="p-6 border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Payment Records</h2>
          {/* Mobile list view */}
          <div className="sm:hidden space-y-3">
            {payments.map((payment) => (
              <Card key={payment.id} className="p-4 border border-border bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-foreground">{payment.supplier}</div>
                    <div className="text-xs text-muted-foreground">{payment.date} • {payment.weight}kg • Grade {payment.grade}</div>
                    <div className="mt-2 font-semibold">Rs. {payment.amount.toLocaleString()}</div>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    {payment.status === "Pending" && (
                      <Button size="sm" variant="outline" onClick={() => handleMarkAsPaid(payment.id)} className="text-xs">
                        Mark Paid
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleSendSMS(payment.phone, payment.amount)} className="flex items-center gap-1 text-xs">
                      <MessageSquare className="w-3 h-3" /> SMS
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Weight</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{payment.supplier}</td>
                    <td className="py-3 px-4 text-foreground">{payment.weight} kg</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.grade === "A"
                            ? "bg-primary/10 text-primary"
                            : payment.grade === "B"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Grade {payment.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground">Rs. {payment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "Paid"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {payment.status === "Pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsPaid(payment.id)}
                            className="text-xs"
                          >
                            Mark Paid
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendSMS(payment.phone, payment.amount)}
                          className="flex items-center gap-1 text-xs"
                        >
                          <MessageSquare className="w-3 h-3" />
                          SMS
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {/* Centered success modal with animated tick */}
        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent className="max-w-md text-center">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-4">
              <svg className="w-20 h-20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <circle cx="60" cy="60" r="54" stroke="#10B981" strokeWidth="4" className="opacity-10" />
                <path d="M36 62l12 12 36-36" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="checkmark" />
              </svg>
            </div>
            <DialogTitle className="mb-2">{successTitle}</DialogTitle>
            {successDescription && <DialogDescription className="mb-4">{successDescription}</DialogDescription>}
            <div className="flex justify-center">
              <button
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-95"
                onClick={() => setSuccessOpen(false)}
              >
                OK
              </button>
            </div>
            <DialogClose className="sr-only">Close</DialogClose>
            {/* inline styles for checkmark animation */}
            <style>{`
              .checkmark {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: draw 0.6s ease forwards 0.1s;
              }
              @keyframes draw {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </DialogContent>
        </Dialog>
      </div>
  )
}
