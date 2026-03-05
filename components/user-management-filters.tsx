"use client"

import { Search, RotateCcw, Download } from "lucide-react"

interface UserManagementFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  totalCount: number
  filteredCount: number
}

export function UserManagementFilters({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: UserManagementFiltersProps) {
  return (
    <div className="mb-4 space-y-3">
      {/* Filter Buttons Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          사용자 정보 전체
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          사용자 구분 전체
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          지출금액 범위 12월 01일 ~ 12월 28일
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          담당자 전체
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          광고주 대행사 전체
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          매체 신디사 전체
        </button>
        <button className="rounded border border-[#79bd2f] bg-[#79bd2f] px-3 py-1.5 text-sm text-white hover:bg-[#6aad20]">
          상태 전체
        </button>
        <button className="rounded border border-gray-300 bg-[#ffffff] px-3 py-1.5 text-sm text-[#000000] hover:bg-gray-100">
          잔여금액
        </button>
        <button className="rounded border border-gray-300 bg-[#ffffff] px-3 py-1.5 text-sm text-[#000000] hover:bg-gray-100">
          카테고리필터
        </button>
        <button className="rounded border border-gray-300 bg-[#ffffff] px-3 py-1.5 text-sm text-[#000000] hover:bg-gray-100">
          검색
        </button>
        <button className="ml-auto flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <RotateCcw className="h-4 w-4" />
          초기화
        </button>
      </div>

      {/* Count and Search Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            광고주 전황 : <span className="font-semibold">{filteredCount.toLocaleString()}</span> /{" "}
            {totalCount.toLocaleString()}
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 rounded border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-[#79bd2f] focus:outline-none focus:ring-1 focus:ring-[#79bd2f]"
            />
            <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
