"use client"

import { useState } from "react"
import type { Integration } from "@/lib/dummy-data"
import { NewFeatureBadge } from "./new-feature-badge"

interface CPSDataTableProps {
  data: Integration[]
  onDisconnectClick: (advertiserId: string) => void
  highlightEnabled?: boolean
}

export function CPSDataTable({ data, onDisconnectClick, highlightEnabled = false }: CPSDataTableProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="overflow-hidden rounded bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-[#f8f8f8] text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 font-medium text-gray-700">광고주명</th>
            <th className="px-4 py-3 font-medium text-gray-700">광고주 ID</th>
            <th className="px-4 py-3 font-medium text-gray-700">영업 담당자</th>
            <th className="px-4 py-3 font-medium text-gray-700">운영 담당자</th>
            <th className="px-4 py-3 font-medium text-gray-700">
              <div id="new-04-unlink" className="relative inline-flex items-center gap-1">
                <span>CPS 계정 연동 여부</span>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[10px] text-gray-500 hover:border-gray-600 hover:text-gray-700"
                  >
                    ?
                  </button>
                  {showTooltip && (
                    <div className="absolute left-0 top-6 z-10 w-64 rounded bg-gray-800 px-3 py-2 text-xs font-normal text-white shadow-lg">
                      연동 해제가 필요한 경우, 해제할 계정의 '연동됨' 상태값을 클릭하세요.
                      <div className="absolute -top-1 left-2 h-2 w-2 rotate-45 bg-gray-800" />
                    </div>
                  )}
                </div>
                <NewFeatureBadge
                  id="NEW-04"
                  showBadge={highlightEnabled}
                  position="inline"
                  tooltipText={[
                    "'연동됨' 클릭 시 연동 해제(Update/Delete)",
                    "연동 해제 일자 업데이트",
                    "해제 후 CPS 계정은 부모 계정 기반 모수(장바구니/상품조회) 사용 불가",
                  ]}
                />
              </div>
            </th>
            <th className="px-4 py-3 font-medium text-gray-700">CPS 계정 광고주 ID</th>
            <th className="px-4 py-3 font-medium text-gray-700">연동 완료 일자</th>
            <th className="px-4 py-3 font-medium text-gray-700">연동 해제 일자</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                조회된 내역이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.advertiserId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{item.advertiserName}</td>
                <td className="px-4 py-3 text-gray-600">{item.advertiserId}</td>
                <td className="px-4 py-3 text-gray-600">{item.salesManager}</td>
                <td className="px-4 py-3 text-gray-600">{item.operationManager}</td>
                <td className="px-4 py-3">
                  {item.isConnected ? (
                    <button
                      onClick={() => onDisconnectClick(item.advertiserId)}
                      className="text-sm font-medium text-[#8bc34a] underline decoration-[#8bc34a] underline-offset-2 hover:text-[#7cb342]"
                    >
                      연동됨
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">미연동</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {item.cpsAccountId ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">CPS</span>
                      <span className="text-gray-600">{item.cpsAccountId}</span>
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{item.connectedAt || "-"}</td>
                <td className="px-4 py-3 text-gray-600">{item.disconnectedAt || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
