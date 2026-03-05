"use client"

import { X, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NewFeatureDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (anchorId: string) => void
}

const newFeatures = [
  {
    id: "NEW-01",
    anchorId: "new-01-menu",
    title: "CPS 계정 연동 관리 메뉴 추가",
    summary: "최고관리자 > 사용자 관리 내 'CPS 계정 연동 관리' 신규 메뉴 추가",
    description: [
      "최고관리자 권한 사용자에게 '사용자 관리' 하위 메뉴로 'CPS 계정 연동 관리' 신규 메뉴가 노출됩니다.",
      "해당 메뉴 진입 시 CPS 계정 연동 상태를 조회/관리할 수 있는 전용 화면으로 이동합니다.",
      "기존 '사용자 관리' 메뉴와 탭 형태로 전환 가능합니다.",
      "권한이 없는 사용자에게는 해당 메뉴가 노출되지 않습니다.",
    ],
    path: "최고관리자 > 사용자관리 > CPS 계정 연동 관리",
  },
  {
    id: "NEW-02",
    anchorId: "new-02-create-link",
    title: "본(부모) <> CPS(자식) 계정 연동(Create)",
    summary: "운영자가 본 계정과 CPS 계정을 1:1로 연동하는 기능",
    description: [
      "운영자는 '연동 추가' 버튼을 클릭하여 본(부모) 계정과 CPS(자식) 계정을 1:1로 연동할 수 있습니다.",
      "STEP1: 본 계정 선택 → 검색 및 단일 선택",
      "STEP2: CPS 계정 선택 → 검색 및 단일 선택 (본 계정과 다른 계정만 선택 가능)",
      "연동 시 두 계정이 서로 다른 계정인지 Validation 체크가 수행됩니다.",
      "성공 시 연동 상태, CPS 계정 ID, 연동 완료 일자가 즉시 반영됩니다.",
    ],
    path: "CPS 계정 연동 관리 > 연동 추가 버튼",
  },
  {
    id: "NEW-03",
    anchorId: "new-03-read-list",
    title: "연동 완료 목록 조회(Read)",
    summary: "연동 완료된 광고주 목록을 CPS 계정 연동 관리 화면에서 조회",
    description: [
      "연동 완료된 광고주만 목록에 조회됩니다 (미연동 계정은 목록에서 제외).",
      "조회 컬럼: 광고주명, 광고주 ID, 영업 담당자, 운영 담당자, CPS 계정 연동 여부, CPS 계정 광고주 ID, 연동 완료 일자, 연동 해제 일자",
      "연동 완료 일자 기준 내림차순(최신순) 정렬이 기본값입니다.",
      "검색 및 필터(영업 담당자, 운영 담당자)를 통해 특정 계정을 빠르게 찾을 수 있습니다.",
    ],
    path: "CPS 계정 연동 관리 > 연동 완료 리스트",
  },
  {
    id: "NEW-04",
    anchorId: "new-04-unlink",
    title: "연동 해제(Update/Delete) 기능",
    summary: "'연동됨' 클릭 시 연동 해제 및 연동 해제 일자 업데이트",
    description: [
      "'CPS 계정 연동 여부' 컬럼에서 '연동됨' 상태값을 클릭하면 연동 해제 모달이 노출됩니다.",
      "연동 해제 확인 시 해당 계정의 연동이 해제되고, '연동 해제 일자'가 업데이트됩니다.",
      "연동 해제된 CPS 계정은 더 이상 부모 계정 기반 모수(장바구니/상품조회)를 사용할 수 없습니다.",
      "연동 해제 후에도 해당 행은 목록에서 유지되며, 연동 상태만 '미연동'으로 변경됩니다.",
      "필요 시 동일 계정을 다시 연동할 수 있습니다.",
    ],
    path: "CPS 계정 연동 관리 > 연동됨 클릭 > 연동 해제 모달",
  },
]

export function NewFeatureDrawer({ isOpen, onClose, onNavigate }: NewFeatureDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-[480px] overflow-y-auto bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">신규 기능 설명</h2>
          <button onClick={onClose} className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 p-6">
          {newFeatures.map((feature) => (
            <div key={feature.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              {/* Badge & Title */}
              <div className="mb-2 flex items-start gap-2">
                <Badge className="bg-[#8bc34a] text-white hover:bg-[#7cb342]">NEW</Badge>
                <div>
                  <h3 className="font-bold text-gray-800">
                    {feature.id}: {feature.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600">{feature.summary}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-3 mt-3 rounded bg-gray-50 p-3">
                <p className="mb-2 text-xs font-medium text-gray-500">상세 설명</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {feature.description.map((line, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Path */}
              <div className="mb-3 text-xs text-gray-500">
                <span className="font-medium">관련 화면:</span> {feature.path}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigate(feature.anchorId)}
                className="flex w-full items-center justify-center gap-1 rounded border border-[#8bc34a] bg-white px-3 py-2 text-sm font-medium text-[#8bc34a] hover:bg-[#8bc34a] hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                해당 위치로 이동
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
