"use client"

import { useState } from "react"
import { parentAccounts, cpsAccounts } from "@/lib/dummy-data"

interface AddIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (parentId: string, cpsId: string) => void
}

export function AddIntegrationModal({ isOpen, onClose, onSubmit }: AddIntegrationModalProps) {
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
  const [selectedCps, setSelectedCps] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    setStep(1)
    setSearchQuery("")
    setSelectedParent(null)
    setSelectedCps(null)
    setShowConfirmation(false)
    setError(null)
    onClose()
  }

  const filteredParentAccounts = parentAccounts.filter((account) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      account.name.toLowerCase().includes(query) ||
      account.id.toLowerCase().includes(query) ||
      account.salesManager.toLowerCase().includes(query) ||
      account.operationManager.toLowerCase().includes(query)
    )
  })

  const filteredCpsAccounts = cpsAccounts.filter((account) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      account.name.toLowerCase().includes(query) ||
      account.id.toLowerCase().includes(query) ||
      account.salesManager.toLowerCase().includes(query) ||
      account.operationManager.toLowerCase().includes(query)
    )
  })

  const handleNextStep = () => {
    if (step === 1 && selectedParent) {
      // Validate parent is not CPS account
      if (selectedParent.toLowerCase().includes("cps")) {
        setError("해당 계정은 CPS 계정입니다. 본 계정을 선택해주세요.")
        return
      }
      setError(null)
      setSearchQuery("")
      setStep(2)
    } else if (step === 2 && selectedCps) {
      // Validate CPS account
      if (!selectedCps.toLowerCase().includes("cps")) {
        setError("해당 계정은 CPS 계정이 아닙니다. CPS 계정을 선택해주세요.")
        return
      }
      setError(null)
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    if (selectedParent && selectedCps) {
      onSubmit(selectedParent, selectedCps)
      handleClose()
    }
  }

  const selectedParentAccount = parentAccounts.find((account) => account.id === selectedParent)

  if (!isOpen) return null

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800">연동 영향 안내</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start gap-2">
                <span className="text-[#8bc34a]">•</span>본 계정의 장바구니·상품조회 모수가 CPS 계정에 2중 적재됩니다.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#8bc34a]">•</span>
                연동된 CPS 계정은 스태틱 배너로만 광고 세팅이 가능합니다.
              </p>
            </div>
            <div className="mt-4 rounded bg-gray-50 p-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">본 계정:</span> {selectedParent}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">CPS 계정:</span> {selectedCps}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              onClick={handleClose}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342]"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {step === 1 ? "Step 1: 본 계정 선택" : "Step 2: CPS 계정 선택"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="px-6 py-4">
          {step === 2 && selectedParentAccount && (
            <div className="mb-4 rounded-lg border border-[#8bc34a] bg-[#f5f9f0] p-3">
              <p className="mb-1 text-xs font-medium text-[#6b9b2a]">선택된 본 계정</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{selectedParentAccount.name}</p>
                  <p className="text-sm text-gray-600">ID: {selectedParentAccount.id}</p>
                </div>
                <span className="rounded bg-[#8bc34a] px-2 py-1 text-xs font-medium text-white">본 계정</span>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="광고주명, 담당자, 아이디를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none"
            />
            <button className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342]">
              적용
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          {/* Account List */}
          <div className="max-h-80 overflow-y-auto rounded border border-gray-200">
            {step === 1
              ? filteredParentAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`cursor-pointer border-b border-gray-100 p-3 last:border-b-0 hover:bg-gray-50 ${
                      selectedParent === account.id ? "bg-green-50" : ""
                    }`}
                    onClick={() => setSelectedParent(account.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="parentAccount"
                        checked={selectedParent === account.id}
                        onChange={() => setSelectedParent(account.id)}
                        className="h-4 w-4 accent-[#8bc34a]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{account.name}</p>
                        <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                          <p>- 광고주 ID: {account.id}</p>
                          <p>- 영업 담당자: {account.salesManager}</p>
                          <p>- 운영 담당자: {account.operationManager}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : filteredCpsAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`cursor-pointer border-b border-gray-100 p-3 last:border-b-0 hover:bg-gray-50 ${
                      selectedCps === account.id ? "bg-green-50" : ""
                    }`}
                    onClick={() => setSelectedCps(account.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="cpsAccount"
                        checked={selectedCps === account.id}
                        onChange={() => setSelectedCps(account.id)}
                        className="h-4 w-4 accent-[#8bc34a]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800">{account.name}</p>
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                            CPS
                          </span>
                        </div>
                        <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                          <p>- 광고주 ID: {account.id}</p>
                          <p>- 영업 담당자: {account.salesManager}</p>
                          <p>- 운영 담당자: {account.operationManager}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          {step === 2 && (
            <button
              onClick={() => {
                setStep(1)
                setSearchQuery("")
                setError(null)
              }}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              이전
            </button>
          )}
          <button
            onClick={handleClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleNextStep}
            disabled={(step === 1 && !selectedParent) || (step === 2 && !selectedCps)}
            className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 1 ? "다음" : "확인"}
          </button>
        </div>
      </div>
    </div>
  )
}
