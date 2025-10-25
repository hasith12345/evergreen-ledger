"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Eye, X } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

const initialSuppliers = [
  {
    id: 1,
    name: "Sanath Nishantha",
    contact: "0714442389",
    address: "202/1 Ambathanna, Galle.",
    bank: "DFCC Bank",
    bankAccountNumber: "1234567890123456",
    bankAccountName: "Sanath Nishantha",
    totalCollected: "500KG",
    totalPaid: "Rs. 100000",
  },
  {
    id: 2,
    name: "Hashan Hewage",
    contact: "0718890365",
    address: "104/1 Molpe Rd. Theldeniya, Galle.",
    bank: "Sampath Bank",
    bankAccountNumber: "9876543210987654",
    bankAccountName: "Hashan Hewage",
    totalCollected: "490KG",
    totalPaid: "Rs. 95000",
  },
  {
    id: 3,
    name: "Arul Suresh",
    contact: "0766742389",
    address: "202/4 Ambathanna, Galle.",
    bank: "BOC Bank",
    bankAccountNumber: "5555666677778888",
    bankAccountName: "Arul Suresh",
    totalCollected: "780KG",
    totalPaid: "Rs. 160000",
  },
  {
    id: 4,
    name: "Sumana Nishanthi",
    contact: "0723349512",
    address: "22/2 Nittambuwa, Galle.",
    bank: "Commercial",
    bankAccountNumber: "1111222233334444",
    bankAccountName: "Sumana Nishanthi",
    totalCollected: "1100KG",
    totalPaid: "Rs. 235400",
  },
  {
    id: 5,
    name: "Kusumlatha",
    contact: "0756088993",
    address: "89/2 Hatapitiya Dullawa, Galle.",
    bank: "BOC Bank",
    bankAccountNumber: "9999888877776666",
    bankAccountName: "Kusumlatha",
    totalCollected: "562KG",
    totalPaid: "Rs. 102580",
  },
]

const BANKS = [
  'Amana Bank PLC',
  'Bank of Ceylon',
  'Bank of China Ltd (Colombo branch)',
  'Cargills Bank PLC',
  'Citibank N.A.',
  'Commercial Bank of Ceylon PLC',
  'DFCC Bank PLC',
  'Habib Bank Ltd',
  'Hatton National Bank PLC',
  'National Development Bank PLC',
  'Nations Trust Bank PLC',
  'Pan Asia Banking Corporation PLC',
  "People’s Bank",
  'Sampath Bank PLC',
  'Seylan Bank PLC',
  'Standard Chartered Bank Sri Lanka',
]

export default function SuppliersPage() {
  const STORAGE_KEY = 'evergreen_suppliers_v1'

  const [suppliersList, setSuppliersList] = useState(initialSuppliers)
  const [showForm, setShowForm] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<(typeof initialSuppliers)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    bank: "",
    bankAccountNumber: "",
    bankAccountName: "",
  })

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault()
    const newSupplier = {
      id: Math.max(...suppliersList.map((s) => s.id), 0) + 1,
      ...formData,
      totalCollected: "0 kg",
      totalPaid: "₹0",
    }
    setSuppliersList([...suppliersList, newSupplier])
    setFormData({ name: "", contact: "", address: "", bank: "", bankAccountNumber: "", bankAccountName: "" })
    setShowForm(false)
  }

  // Persist suppliers to localStorage so they survive navigation/refresh
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) {
          setSuppliersList(parsed)
        }
      }
    } catch (e) {
      // ignore parse errors
      console.warn('Failed to load suppliers from localStorage', e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliersList))
    } catch (e) {
      console.warn('Failed to save suppliers to localStorage', e)
    }
  }, [suppliersList])

  const handleEditSupplier = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSupplier) return
    setSuppliersList(suppliersList.map((s) => (s.id === selectedSupplier.id ? { ...s, ...formData } : s)))
    setFormData({ name: "", contact: "", address: "", bank: "", bankAccountNumber: "", bankAccountName: "" })
    setSelectedSupplier(null)
    setIsEditing(false)
  }

  const openViewModal = (supplier: (typeof initialSuppliers)[0]) => {
    setSelectedSupplier(supplier)
    setIsEditing(false)
  }

  const openEditModal = (supplier: (typeof initialSuppliers)[0]) => {
    setSelectedSupplier(supplier)
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address,
      bank: supplier.bank,
      bankAccountNumber: supplier.bankAccountNumber,
      bankAccountName: supplier.bankAccountName,
    })
    setIsEditing(true)
  }

  const closeModal = () => {
    setSelectedSupplier(null)
    setIsEditing(false)
    setFormData({ name: "", contact: "", address: "", bank: "", bankAccountNumber: "", bankAccountName: "" })
  }

  return (
    <LayoutWrapper>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Suppliers</h1>
            <p className="text-muted-foreground">Manage your tea leaf suppliers</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </Button>
        </div>

        {/* Registration Form */}
        {showForm && (
          <Card className="p-6 border border-border bg-card mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Register New Supplier</h2>
            <form onSubmit={handleAddSupplier} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Supplier name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <Input
                    type="text"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-primary/30 rounded-lg p-6 bg-primary/5">
                <h3 className="text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                    <Select
                      value={formData.bank}
                      onValueChange={(val) => setFormData({ ...formData, bank: val })}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {BANKS.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number</label>
                    <Input
                      type="text"
                      placeholder="Account number"
                      value={formData.bankAccountNumber}
                      onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Account Name</label>
                    <Input
                      type="text"
                      placeholder="Account holder name"
                      value={formData.bankAccountName}
                      onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Register Supplier
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-muted hover:bg-muted/80 text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Suppliers List */}
        <div className="space-y-4">
          {suppliersList.map((supplier) => (
            <Card key={supplier.id} className="p-6 border border-border bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{supplier.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                    onClick={() => openViewModal(supplier)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                    onClick={() => openEditModal(supplier)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contact</p>
                  <p className="font-semibold text-foreground">{supplier.contact}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bank</p>
                  <p className="font-semibold text-foreground">{supplier.bank}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Collected</p>
                  <p className="font-semibold text-primary">{supplier.totalCollected}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                  <p className="font-semibold text-foreground">{supplier.totalPaid}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedSupplier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl border border-border bg-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {isEditing ? "Edit Supplier" : "Supplier Details"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSupplier} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                        <Input
                          type="tel"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <Input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="border-2 border-primary/30 rounded-lg p-6 bg-primary/5">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                          <Select
                            value={formData.bank}
                            onValueChange={(val) => setFormData({ ...formData, bank: val })}
                            className="w-full"
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {BANKS.map((b) => (
                                <SelectItem key={b} value={b}>
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number</label>
                          <Input
                            type="text"
                            value={formData.bankAccountNumber}
                            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bank Account Name</label>
                          <Input
                            type="text"
                            value={formData.bankAccountName}
                            onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Save Changes
                      </Button>
                      <Button type="button" onClick={closeModal} className="bg-muted hover:bg-muted/80 text-foreground">
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Name</p>
                        <p className="text-lg font-semibold text-foreground">{selectedSupplier.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                        <p className="text-lg font-semibold text-foreground">{selectedSupplier.contact}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="text-lg font-semibold text-foreground">{selectedSupplier.address}</p>
                      </div>
                    </div>

                    <div className="border-2 border-primary/30 rounded-lg p-6 bg-primary/5">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                          <p className="text-lg font-semibold text-foreground">{selectedSupplier.bank}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Account Number</p>
                          <p className="text-lg font-semibold text-foreground">{selectedSupplier.bankAccountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Account Name</p>
                          <p className="text-lg font-semibold text-foreground">{selectedSupplier.bankAccountName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
                        <p className="text-lg font-semibold text-primary">{selectedSupplier.totalCollected}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                        <p className="text-lg font-semibold text-foreground">{selectedSupplier.totalPaid}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => openEditModal(selectedSupplier)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Supplier
                      </Button>
                      <Button onClick={closeModal} className="bg-muted hover:bg-muted/80 text-foreground">
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
