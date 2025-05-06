"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  type?: "success" | "warning" | "error" | "info"
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description = "",
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
  type = "info",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    onOpenChange(false)
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case "warning":
        return <AlertCircle className="h-6 w-6 text-amber-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="bg-transparent">
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="sm:justify-center sm:space-x-4">
          {onCancel && (
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          <Button onClick={handleConfirm} variant={type === "error" ? "destructive" : "default"}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
