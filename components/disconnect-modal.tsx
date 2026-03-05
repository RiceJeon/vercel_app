"use client"

import { useState } from "react"

type ErrorType = "already_disconnected" | "temporary_error" | null

interface DisconnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onRefreshList: () => void // 목록 새로고침 콜백 추가
  advertiserName?: string
}

export function DisconnectModal({ isOpen, onClose, onConfirm, onRefreshList, advertiserName }: DisconnectModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorType, setErrorType] = useState<ErrorType>(null)

  const simulateDisconnect = (): "success" | "already_disconnected" | "temporary_error" => {
    const random = Math.random()
    if (random < 0.8) return "success"
    if (random < 0.9) return "already_disconnected"
    return "temporary_error"
  }

  const handleConfirm = () => {
    setIsProcessing(true)
    setErrorType(null)

    setTimeout(() => {
      const result = simulateDisconnect()

      if (result === "success") {
        onConfirm()
        setErrorType(null)
      } else {
        setErrorType(result)
      }
      setIsProcessing(false)
    }, 500)
  }

  const handleRetry = () => {
    handleConfirm()
  }

  const handleRefreshList = () => {
    onRefreshList()
    setErrorType(null)
    onClose()
  }

  const handleClose = () => {
    setErrorType(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">CPS 계정 연동 해제</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="px-6 py-4">
          {advertiserName && (
            <p className="mb-4 text-sm text-gray-700">
              <span className="font-bold text-gray-800">{advertiserName}</span>의 CPS 계정 연동을 해제하시겠습니까?
            </p>
          )}

          <div className="space-y-2 rounded bg-yellow-50 p-3 text-sm text-yellow-800">
            <p>• 연동 해제 시 CPS 계정은 본 계정 기반 적재된 모수를 사용할 수 없습니다.</p>
            <p>• 연동 해제 이후 신규 모수 적재는 중단됩니다.</p>
          </div>

          {errorType === "already_disconnected" && (
            <div className="mt-4 rounded bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">이미 연동 해제된 계정입니다.</p>
              <p className="mt-1 text-sm text-red-600">최신 상태를 확인하기 위해 목록을 새로고침해 주세요.</p>
            </div>
          )}

          {errorType === "temporary_error" && (
            <div className="mt-4 rounded bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">연동 해제 처리 중 일시적인 오류가 발생했습니다.</p>
              <p className="mt-1 text-sm text-red-600">잠시 후 다시 시도해 주세요.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          {errorType === "already_disconnected" ? (
            <>
              <button
                onClick={handleRefreshList}
                className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342]"
              >
                목록 새로고침
              </button>
              <button
                onClick={handleClose}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
            </>
          ) : errorType === "temporary_error" ? (
            <>
              <button
                onClick={handleRetry}
                disabled={isProcessing}
                className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "처리 중..." : "다시 시도"}
              </button>
              <button
                onClick={handleClose}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleClose}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "처리 중..." : "연동 해제"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
