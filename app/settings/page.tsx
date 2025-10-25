"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Eye, EyeOff, ShieldCheck } from "lucide-react"

const defaultRates = [
  { grade: "A", rate: 500 },
  { grade: "B", rate: 350 },
  { grade: "C", rate: 200 },
]

export default function SettingsPage() {
  const [rates, setRates] = useState(defaultRates)
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })
  const [saveMessage, setSaveMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  const handleRateChange = (index: number, newRate: string) => {
    const updatedRates = [...rates]
    updatedRates[index].rate = Number.parseFloat(newRate) || 0
    setRates(updatedRates)
  }

  const handleSaveRates = () => {
    setSaveMessage("Tea leaf rates updated successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.")
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.")
      return
    }

    // Simulate success
    setPasswordMessage("Password changed successfully!")
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
    setTimeout(() => setPasswordMessage(""), 3000)
  }

  return (
    <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and security</p>
        </div>

        {/* Tea Leaf Rates */}
        <Card className="p-6 border border-border bg-card mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Tea Leaf Rates per Grade</h2>
          <div className="space-y-4 mb-6">
            {rates.map((item, index) => (
              <div key={item.grade} className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">Grade {item.grade}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">Rs.</span>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleRateChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-foreground">/kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {saveMessage && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 text-primary text-sm">
              {saveMessage}
            </div>
          )}

          <Button
            onClick={handleSaveRates}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Rates
          </Button>
        </Card>

        {/* Password Change - modernized */}
        <Card className="p-6 border border-border bg-card">
          <div className="md:flex md:items-start md:gap-6">
            <div className="md:flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Change Password
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Old Password</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.old ? "text" : "password"}
                      placeholder="Enter old password"
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Use a strong password — at least 8 characters, with numbers and symbols.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Update Password
                  </Button>
                </div>

                {passwordMessage && (
                  <div className={`mt-3 text-sm ${passwordMessage.includes('successfully') ? 'text-primary' : 'text-destructive'}`}>
                    {passwordMessage}
                  </div>
                )}
              </form>
            </div>

            <aside className="mt-6 md:mt-0 md:w-80">
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Password guidance</p>
                  <p className="text-xs text-muted-foreground">Use a password of at least 8 characters. Avoid reusing old passwords and consider using a password manager for stronger security.</p>
                </div>
              </div>
            </aside>
          </div>
        </Card>
      </div>
  )
}
