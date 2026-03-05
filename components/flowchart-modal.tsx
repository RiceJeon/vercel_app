"use client"

import type React from "react"

interface FlowchartModalProps {
  isOpen: boolean
  onClose: () => void
}

// Node Components
function ProcessNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-w-[100px] max-w-[120px] items-center justify-center rounded-lg border border-[#2F6FED] bg-[#EAF2FF] px-2 py-1 text-center text-[10px] font-medium leading-tight text-[#0B1F44]">
      {children}
    </div>
  )
}

function DecisionNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-w-[90px] max-w-[110px] items-center justify-center rounded-lg border border-[#D39B00] bg-[#FFF6D8] px-2 py-1 text-center text-[10px] font-medium leading-tight text-[#3A2A00]">
      <span className="rotate-0">{children}</span>
    </div>
  )
}

function ErrorNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-w-[100px] max-w-[120px] items-center justify-center rounded-lg border border-[#D92D20] bg-[#FFE7E7] px-2 py-1 text-center text-[10px] font-medium leading-tight text-[#4A0A0A]">
      {children}
    </div>
  )
}

function SuccessNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-w-[100px] max-w-[120px] items-center justify-center rounded-lg border border-[#12B76A] bg-[#E7F8EE] px-2 py-1 text-center text-[10px] font-medium leading-tight text-[#05331D]">
      {children}
    </div>
  )
}

function Arrow({ direction = "right" }: { direction?: "right" | "down" | "up" }) {
  if (direction === "down") {
    return (
      <div className="flex h-4 w-full items-center justify-center">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M5 0V12M5 12L1 8M5 12L9 8" stroke="#666" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }
  if (direction === "up") {
    return (
      <div className="flex h-4 w-full items-center justify-center">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M5 16V4M5 4L1 8M5 4L9 8" stroke="#666" strokeWidth="1.5" />
        </svg>
      </div>
    )
  }
  return (
    <div className="flex h-full w-6 items-center justify-center">
      <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
        <path d="M0 5H20M20 5L15 1M20 5L15 9" stroke="#666" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function ArrowLabel({ label, direction = "right" }: { label: string; direction?: "right" | "down" }) {
  if (direction === "down") {
    return (
      <div className="flex flex-col items-center">
        <span className="mb-0.5 text-[8px] text-gray-500">{label}</span>
        <Arrow direction="down" />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="mb-0.5 text-[8px] text-gray-500">{label}</span>
      <Arrow direction="right" />
    </div>
  )
}

export function FlowchartModal({ isOpen, onClose }: FlowchartModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[95vw] rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">CPS 계정 연동 관리 기능 플로우</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="max-h-[85vh] overflow-auto px-4 py-4">
          <div className="flex min-w-[1200px] gap-4">
            {/* G1: 접근 및 진입 */}
            <div className="rounded-lg border border-[#C7D2FE] bg-[#F6F8FF] p-3">
              <h3 className="mb-3 text-center text-xs font-bold text-gray-700">접근 및 진입</h3>
              <div className="flex flex-col items-center gap-1">
                <ProcessNode>운영자 로그인</ProcessNode>
                <Arrow direction="down" />
                <DecisionNode>
                  최고관리자
                  <br />
                  권한 여부
                </DecisionNode>

                <div className="flex w-full items-start justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <ArrowLabel label="아니오" direction="down" />
                    <ErrorNode>
                      접근 불가
                      <br />
                      메시지 노출
                    </ErrorNode>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowLabel label="예" direction="down" />
                    <ProcessNode>
                      최고관리자
                      <br />
                      사용자 관리 진입
                    </ProcessNode>
                    <Arrow direction="down" />
                    <ProcessNode>
                      CPS 계정 연동
                      <br />
                      관리 메뉴 클릭
                    </ProcessNode>
                    <Arrow direction="down" />
                    <ProcessNode>
                      CPS 계정 연동
                      <br />
                      관리 화면 진입
                    </ProcessNode>
                  </div>
                </div>
              </div>
            </div>

            <Arrow />

            {/* G2: 연동 완료 리스트 조회 및 탐색 */}
            <div className="rounded-lg border border-[#A6F4C5] bg-[#F6FFFB] p-3">
              <h3 className="mb-3 text-center text-xs font-bold text-gray-700">연동 완료 리스트 조회 및 탐색</h3>
              <div className="flex flex-col items-center gap-1">
                <ProcessNode>
                  연동 완료
                  <br />
                  광고주 리스트 조회
                </ProcessNode>
                <Arrow direction="down" />
                <DecisionNode>
                  조회 데이터
                  <br />
                  존재 여부
                </DecisionNode>

                <div className="flex w-full items-start justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <ArrowLabel label="없음" direction="down" />
                    <ErrorNode>
                      조회된 내역이
                      <br />
                      없습니다 노출
                    </ErrorNode>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowLabel label="있음" direction="down" />
                    <ProcessNode>
                      연동 완료 광고주
                      <br />
                      리스트 노출
                    </ProcessNode>
                    <Arrow direction="down" />
                    <ProcessNode>
                      검색 / 필터 /<br />
                      소팅 선택
                    </ProcessNode>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[8px] text-gray-500">↺ 리스트 갱신</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Arrow />

            {/* G3: 연동 추가 플로우 */}
            <div className="rounded-lg border border-[#FEDF89] bg-[#FFFBF2] p-3">
              <h3 className="mb-3 text-center text-xs font-bold text-gray-700">연동 추가 플로우</h3>
              <div className="flex gap-3">
                {/* Left Column */}
                <div className="flex flex-col items-center gap-1">
                  <ProcessNode>
                    연동 추가
                    <br />
                    버튼 클릭
                  </ProcessNode>
                  <Arrow direction="down" />
                  <ProcessNode>
                    연동 생성 모달
                    <br />
                    노출
                  </ProcessNode>
                  <Arrow direction="down" />
                  <DecisionNode>
                    본 계정 검색
                    <br />
                    결과 존재
                  </DecisionNode>

                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <ArrowLabel label="없음" direction="down" />
                      <ErrorNode>
                        검색 결과
                        <br />
                        없음 안내
                      </ErrorNode>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ArrowLabel label="있음" direction="down" />
                      <ProcessNode>
                        본 계정 리스트
                        <br />
                        노출 및 선택
                      </ProcessNode>
                      <Arrow direction="down" />
                      <ProcessNode>다음 버튼 클릭</ProcessNode>
                    </div>
                  </div>
                </div>

                <Arrow />

                {/* Middle Column */}
                <div className="flex flex-col items-center gap-1">
                  <ProcessNode>
                    선택 본 계정 기준
                    <br />
                    CPS 계정 조회
                  </ProcessNode>
                  <Arrow direction="down" />
                  <DecisionNode>
                    CPS 계정
                    <br />
                    선택 가능
                  </DecisionNode>

                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <ArrowLabel label="아니오" direction="down" />
                      <ErrorNode>
                        연동 불가
                        <br />
                        메시지 노출
                      </ErrorNode>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ArrowLabel label="예" direction="down" />
                      <ProcessNode>
                        연동 영향 안내
                        <br />
                        모달 노출
                      </ProcessNode>
                      <Arrow direction="down" />
                      <DecisionNode>연동하기 클릭</DecisionNode>
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <ArrowLabel label="취소" direction="down" />
                          <span className="text-[8px] text-gray-500">← 리스트</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <ArrowLabel label="확인" direction="down" />
                          <DecisionNode>
                            유효성 검증
                            <br />
                            API 정상
                          </DecisionNode>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Arrow />

                {/* Right Column - Results */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mb-1 text-[8px] text-gray-500">실패</span>
                      <ErrorNode>
                        연동 실패 Alert
                        <br />
                        사유 포함 노출
                      </ErrorNode>
                      <Arrow direction="down" />
                      <span className="text-[8px] text-gray-500">← 리스트</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="mb-1 text-[8px] text-gray-500">성공</span>
                      <SuccessNode>연동 성공 처리</SuccessNode>
                      <Arrow direction="down" />
                      <ProcessNode>
                        연동 완료 리스트
                        <br />
                        즉시 갱신
                      </ProcessNode>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-gray-50 p-2">
            <span className="text-[10px] font-medium text-gray-600">범례:</span>
            <div className="flex items-center gap-1">
              <div className="h-3 w-5 rounded border border-[#2F6FED] bg-[#EAF2FF]"></div>
              <span className="text-[10px] text-gray-600">기본 프로세스</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-5 rounded border border-[#D39B00] bg-[#FFF6D8]"></div>
              <span className="text-[10px] text-gray-600">분기 조건</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-5 rounded border border-[#D92D20] bg-[#FFE7E7]"></div>
              <span className="text-[10px] text-gray-600">오류 / 불가</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-5 rounded border border-[#12B76A] bg-[#E7F8EE]"></div>
              <span className="text-[10px] text-gray-600">성공</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
