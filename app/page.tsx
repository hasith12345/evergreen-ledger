"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = () => {
    if (!username.trim() || !password) {
      setError("Please enter both username and password.")
      return false
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.")
      return false
    }
    setError(null)
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)

    // Simulate login delay and success
    setTimeout(() => {
      // optionally persist demo 'remember me' in localStorage
      if (remember) localStorage.setItem('evergreen_remember', username)
      router.push('/dashboard')
    }, 700)
  }

  const handleDemo = () => {
    setUsername('demo.user')
    setPassword('demo1234')
    setRemember(true)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <img
                src="/logo.png"
                alt="EvergreenLedger Logo"
                className="w-16 h-16 object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-200 mb-1">EvergreenLedger</h1>
          <p className="text-sm text-white/80">Tea Leaf Supplier Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-card/95 backdrop-blur-md rounded-xl shadow-lg p-7 border border-border/50">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                aria-label="username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  aria-label="password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(Boolean(v))}
                />
                <label htmlFor="remember" className="text-sm select-none">Remember me</label>
              </div>

              <button className="text-sm text-primary hover:underline" type="button" onClick={handleDemo}>
                Use demo credentials
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
              aria-disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-primary hover:underline" type="button">
                  Forgot Password?
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset your password</DialogTitle>
                  <DialogDescription>
                    Enter your email or username and we'll send a password reset link.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const fd = new FormData(form)
                    const val = (fd.get('reset') || '').toString().trim()
                    if (!val) return
                    // simulate sending reset
                    setTimeout(() => {
                      // show simple success message by replacing content
                      alert('If an account exists for "' + val + '", a reset link has been sent.')
                    }, 500)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="reset" className="block text-sm font-medium text-foreground mb-2">
                      Email or username
                    </label>
                    <Input id="reset" name="reset" placeholder="you@example.com or username" />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Send reset link</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">© 2025 EvergreenLedger. All rights reserved.</p>
      </div>
    </div>
  )
}
