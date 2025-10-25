"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Eye, X, Trash2, Check } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
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
  const { toast } = useToast()
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
    // show success toast with animated tick (title must be plain text for the Toast component)
    toast({
      title: 'Supplier added',
      description: (
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500 animate-pulse" />
          <span>{newSupplier.name} was successfully added.</span>
        </div>
      ),
    })
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
    // show success toast (title must be plain text)
    toast({
      title: 'Supplier updated',
      description: (
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500 animate-pulse" />
          <span>Changes saved successfully.</span>
        </div>
      ),
    })
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

  // delete without confirmation (confirmation handled via dialog)
  const handleDeleteSupplier = (id: number) => {
    const next = suppliersList.filter((s) => s.id !== id)
    setSuppliersList(next)
    // close modal if it was open for this supplier
    if (selectedSupplier?.id === id) closeModal()
  }

  const [deleteTarget, setDeleteTarget] = useState<(typeof initialSuppliers)[0] | null>(null)

  const closeModal = () => {
    setSelectedSupplier(null)
    setIsEditing(false)
    setFormData({ name: "", contact: "", address: "", bank: "", bankAccountNumber: "", bankAccountName: "" })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Suppliers</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your tea leaf suppliers</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 min-h-[44px] touch-manipulation w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </Button>
        </div>

        {/* Registration Form */}
        {showForm && (
          <Card className="p-4 sm:p-6 border border-border bg-card mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Register New Supplier</h2>
            <form onSubmit={handleAddSupplier} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Supplier name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 text-base"
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
                    className="h-11 text-base"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <Input
                    type="text"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-11 text-base"
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-primary/30 rounded-lg p-4 sm:p-6 bg-primary/5">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                    <Select
                      value={formData.bank}
                      onValueChange={(val) => setFormData({ ...formData, bank: val })}
                    >
                      <SelectTrigger className="w-full h-11">
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
                      className="h-11 text-base"
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
                      className="h-11 text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px] touch-manipulation"
                >
                  Register Supplier
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-muted hover:bg-muted/80 text-foreground min-h-[44px] touch-manipulation"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Delete confirmation dialog */}
        <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete supplier</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {deleteTarget?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => {
                  if (deleteTarget) handleDeleteSupplier(deleteTarget.id)
                  setDeleteTarget(null)
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Suppliers List */}
        <div className="space-y-3 sm:space-y-4">
          {suppliersList.map((supplier) => (
            <Card key={supplier.id} className="p-4 sm:p-6 border border-border bg-card hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 break-words">{supplier.address}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent min-h-[40px] touch-manipulation flex-1 sm:flex-none"
                    onClick={() => openViewModal(supplier)}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="sm:inline">View</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent min-h-[40px] touch-manipulation flex-1 sm:flex-none"
                    onClick={() => openEditModal(supplier)}
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="sm:inline">Edit</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent text-destructive border-destructive hover:bg-destructive/10 min-h-[40px] touch-manipulation flex-1 sm:flex-none"
                    onClick={() => setDeleteTarget(supplier)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sm:inline">Delete</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Contact</p>
                  <p className="font-semibold text-foreground text-sm break-all">{supplier.contact}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Bank</p>
                  <p className="font-semibold text-foreground text-sm truncate" title={supplier.bank}>{supplier.bank}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Total Collected</p>
                  <p className="font-semibold text-primary text-sm">{supplier.totalCollected}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                  <p className="font-semibold text-foreground text-sm">{supplier.totalPaid}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedSupplier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <Card className="w-full max-w-2xl border border-border bg-card my-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-card pb-4 border-b">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground">
                    {isEditing ? "Edit Supplier" : "Supplier Details"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 touch-manipulation"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSupplier} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-11 text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                        <Input
                          type="tel"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="h-11 text-base"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <Input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="h-11 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-2 border-primary/30 rounded-lg p-4 sm:p-6 bg-primary/5">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                          <Select
                            value={formData.bank}
                            onValueChange={(val) => setFormData({ ...formData, bank: val })}
                          >
                            <SelectTrigger className="w-full h-11">
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
                            className="h-11 text-base"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bank Account Name</label>
                          <Input
                            type="text"
                            value={formData.bankAccountName}
                            onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                            className="h-11 text-base"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px] touch-manipulation"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        onClick={closeModal} 
                        className="bg-muted hover:bg-muted/80 text-foreground min-h-[44px] touch-manipulation"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Name</p>
                        <p className="text-base sm:text-lg font-semibold text-foreground break-words">{selectedSupplier.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                        <p className="text-base sm:text-lg font-semibold text-foreground break-all">{selectedSupplier.contact}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="text-base sm:text-lg font-semibold text-foreground break-words">{selectedSupplier.address}</p>
                      </div>
                    </div>

                    <div className="border-2 border-primary/30 rounded-lg p-4 sm:p-6 bg-primary/5">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Bank Details</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                          <p className="text-base sm:text-lg font-semibold text-foreground break-words">{selectedSupplier.bank}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Account Number</p>
                          <p className="text-base sm:text-lg font-semibold text-foreground break-all">{selectedSupplier.bankAccountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Account Name</p>
                          <p className="text-base sm:text-lg font-semibold text-foreground break-words">{selectedSupplier.bankAccountName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
                        <p className="text-base sm:text-lg font-semibold text-primary">{selectedSupplier.totalCollected}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                        <p className="text-base sm:text-lg font-semibold text-foreground">{selectedSupplier.totalPaid}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        onClick={() => openEditModal(selectedSupplier)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Supplier
                      </Button>
                      <Button
                        onClick={() => selectedSupplier && setDeleteTarget(selectedSupplier)}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Supplier
                      </Button>
                      <Button 
                        onClick={closeModal} 
                        className="bg-muted hover:bg-muted/80 text-foreground min-h-[44px] touch-manipulation"
                      >
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
  )
}
