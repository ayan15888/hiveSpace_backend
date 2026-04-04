"use client"

import { useState } from "react"
import { useWorkspaceStore } from "@/store/workspace/workspaceStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { gooeyToast } from "@/components/ui/goey-toaster"
import { Copy, Check, Ticket } from "lucide-react"

interface InviteMemberModalProps {
  isOpen: boolean
  onClose: () => void
  teamId: string
  teamName: string
}

export function InviteMemberModal({ isOpen, onClose, teamId, teamName }: InviteMemberModalProps) {
  const { generateInvite, isLoading } = useWorkspaceStore()
  const [recipientUsername, setRecipientUsername] = useState("")
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const code = await generateInvite(teamId, recipientUsername)
      setInviteCode(code)
      gooeyToast.success("Invite code generated!")
    } catch (error) {
      console.error("Failed to generate invite:", error)
      gooeyToast.error("Failed to generate invite")
    }
  }

  const copyToClipboard = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      gooeyToast.success("Copied to clipboard!")
    }
  }

  const handleClose = () => {
    setRecipientUsername("")
    setInviteCode(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!inviteCode ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 mb-2">
                <Ticket className="h-6 w-6" />
              </div>
              <DialogTitle>Invite to {teamName}</DialogTitle>
              <DialogDescription>
                Generate a secret code for a teammate to join your organization and this team directly.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Recipient Username</Label>
                <Input
                  id="username"
                  value={recipientUsername}
                  onChange={(e) => setRecipientUsername(e.target.value)}
                  placeholder="Teammate's username"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !recipientUsername}>
                {isLoading ? "Generating..." : "Generate Code"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-2">
                <Check className="h-6 w-6" />
              </div>
              <DialogTitle>Invite Code Ready</DialogTitle>
              <DialogDescription>
                Share this code with <strong>{recipientUsername}</strong>. They can use it on the joining screen.
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative group">
              <div className="flex items-center justify-center h-20 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl">
                <span className="text-3xl font-mono tracking-[0.2em] font-black text-slate-900">
                  {inviteCode}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <DialogFooter>
              <Button className="w-full h-12 rounded-xl bg-slate-900" onClick={handleClose}>
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
