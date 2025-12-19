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
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

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
  children?: React.ReactNode // 추가 컨텐츠 (상품 정보 등)
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
  children,
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
        return <AlertTriangle className="h-6 w-6 text-amber-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case "info":
        return <Info className="h-6 w-6 text-blue-500" />
      default:
        return null
    }
  }

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-700"
      case "warning":
        return "text-amber-700"
      case "error":
        return "text-red-700"
      case "info":
        return "text-blue-700"
      default:
        return "text-gray-900"
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-200"
      case "warning":
        return "border-amber-200"
      case "error":
        return "border-red-200"
      case "info":
        return "border-blue-200"
      default:
        return "border-gray-200"
    }
  }

  const getButtonVariant = () => {
    switch (type) {
      case "error":
        return "destructive"
      case "success":
        return "default"
      case "warning":
        return "default"
      case "info":
        return "default"
      default:
        return "default"
    }
  }

  const getButtonClassName = () => {
    switch (type) {
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white"
      case "warning":
        return "bg-amber-600 hover:bg-amber-700 text-white"
      case "error":
        return "bg-red-600 hover:bg-red-700 text-white" // 삭제 버튼 빨간색
      case "info":
        return "bg-blue-600 hover:bg-blue-700 text-white"
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-md", `border-2 ${getBorderColor()}`)}>
        <DialogHeader>
          <DialogTitle className={cn("flex items-center gap-2", getTitleColor())}>
            {getIcon()}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="mt-2 text-sm text-gray-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {/* 추가 컨텐츠 (상품 정보 등) */}
        {children && (
          <div className="my-4 rounded-lg bg-gray-50 p-4">
            {children}
          </div>
        )}

        <DialogFooter className="sm:justify-end sm:space-x-3">
          {onCancel && (
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            variant={getButtonVariant() as any}
            className={cn(
              getButtonClassName(),
              type === "error" && "bg-red-600 hover:bg-red-700 text-white border-0"
            )}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
