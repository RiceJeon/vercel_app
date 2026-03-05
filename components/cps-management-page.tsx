"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "./admin-header"
import { CPSDataTable } from "./cps-data-table"
import { SearchFilters } from "./search-filters"
import { PolicyModal } from "./policy-modal"
import { FlowchartModal } from "./flowchart-modal"
import { AddIntegrationModal } from "./add-integration-modal"
import { DisconnectModal } from "./disconnect-modal"
import { UserManagementTable } from "./user-management-table"
import { UserManagementFilters } from "./user-management-filters"
import { NewFeatureDrawer } from "./new-feature-drawer"
import { NewFeatureBadge } from "./new-feature-badge"
import { dummyIntegrations, dummyUsers, type Integration } from "@/lib/dummy-data"
import { Switch } from "@/components/ui/switch"
import { Sparkles } from "lucide-react"

interface CPSManagementPageProps {
  initialNewParam?: string | null
}

export function CPSManagementPage({ initialNewParam }: CPSManagementPageProps) {
  const router = useRouter()

  const [highlightEnabled, setHighlightEnabled] = useState(initialNewParam === "1")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<"user" | "cps">("cps")
  const [integrations, setIntegrations] = useState<Integration[]>(dummyIntegrations)
  const [disconnectTargetId, setDisconnectTargetId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [salesFilter, setSalesFilter] = useState("")
  const [operationFilter, setOperationFilter] = useState("")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false)
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false)

  const filteredIntegrations = useMemo(() => {
    let result = integrations.filter((item) => item.cpsAccountId !== null)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.advertiserName.toLowerCase().includes(query) ||
          item.advertiserId.toLowerCase().includes(query) ||
          item.salesManager.toLowerCase().includes(query) ||
          item.operationManager.toLowerCase().includes(query),
      )
    }

    if (salesFilter) {
      result = result.filter((item) => item.salesManager === salesFilter)
    }

    if (operationFilter) {
      result = result.filter((item) => item.operationManager === operationFilter)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.connectedAt || "").getTime()
      const dateB = new Date(b.connectedAt || "").getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [integrations, searchQuery, salesFilter, operationFilter, sortOrder])

  const filteredUsers = useMemo(() => {
    if (!userSearchQuery) return dummyUsers
    const query = userSearchQuery.toLowerCase()
    return dummyUsers.filter(
      (user) =>
        user.companyName.toLowerCase().includes(query) ||
        user.userId.toLowerCase().includes(query) ||
        user.contactPerson.toLowerCase().includes(query),
    )
  }, [userSearchQuery])

  const salesManagers = [...new Set(integrations.map((i) => i.salesManager))]
  const operationManagers = [...new Set(integrations.map((i) => i.operationManager))]

  const handleDisconnectClick = (advertiserId: string) => {
    setDisconnectTargetId(advertiserId)
    setIsDisconnectModalOpen(true)
  }

  const disconnectTargetName = useMemo(() => {
    if (!disconnectTargetId) return undefined
    const target = integrations.find((item) => item.advertiserId === disconnectTargetId)
    return target?.advertiserName
  }, [disconnectTargetId, integrations])

  const handleAddIntegration = (parentId: string, cpsId: string) => {
    const now = new Date().toISOString().split("T")[0]
    setIntegrations((prev) =>
      prev.map((item) =>
        item.advertiserId === parentId
          ? {
              ...item,
              isConnected: true,
              cpsAccountId: cpsId,
              connectedAt: now,
              disconnectedAt: null,
            }
          : item,
      ),
    )
    setIsAddModalOpen(false)
  }

  const handleDisconnect = () => {
    if (!disconnectTargetId) return
    const now = new Date().toISOString().split("T")[0]
    setIntegrations((prev) =>
      prev.map((item) =>
        item.advertiserId === disconnectTargetId
          ? {
              ...item,
              isConnected: false,
              disconnectedAt: now,
            }
          : item,
      ),
    )
    setDisconnectTargetId(null)
    setIsDisconnectModalOpen(false)
  }

  const handleRefreshList = () => {
    if (!disconnectTargetId) return
    const now = new Date().toISOString().split("T")[0]
    setIntegrations((prev) =>
      prev.map((item) =>
        item.advertiserId === disconnectTargetId
          ? {
              ...item,
              isConnected: false,
              disconnectedAt: now,
            }
          : item,
      ),
    )
    setDisconnectTargetId(null)
  }

  const handleDisconnectModalClose = () => {
    setDisconnectTargetId(null)
    setIsDisconnectModalOpen(false)
  }

  const handleNavigateToFeature = (anchorId: string) => {
    setIsDrawerOpen(false)
    setHighlightEnabled(true)

    // URL에 new=1 추가
    const url = new URL(window.location.href)
    url.searchParams.set("new", "1")
    router.push(url.pathname + url.search)

    // CPS 탭으로 전환 (NEW-01 제외)
    if (anchorId !== "new-01-menu") {
      setActiveTab("cps")
    }

    // 스크롤 이동
    setTimeout(() => {
      const element = document.getElementById(anchorId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  const handleToggleHighlight = (checked: boolean) => {
    setHighlightEnabled(checked)
    const url = new URL(window.location.href)
    if (checked) {
      url.searchParams.set("new", "1")
    } else {
      url.searchParams.delete("new")
    }
    router.push(url.pathname + url.search)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AdminHeader />

      <main className="px-6 py-4">
        <div className="mb-4 flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">신규 하이라이트</span>
            <Switch checked={highlightEnabled} onCheckedChange={handleToggleHighlight} />
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded bg-[#8bc34a] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#7cb342]"
          >
            <Sparkles className="h-4 w-4" />
            신규 기능 설명
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-gray-500">
          <span className="text-gray-400">사용자관리</span>
          <span className="mx-2 text-gray-400">{">"}</span>
          <span className="font-medium text-gray-700">
            {activeTab === "cps" ? "CPS 계정 연동 관리" : "사용자 관리"}
          </span>
        </div>

        {/* Page Title & Actions - CPS 탭일 때만 표시 */}
        {activeTab === "cps" && (
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">CPS 계정 연동 관리</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPolicyModalOpen(true)}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                정책 보기
              </button>
              <button
                onClick={() => setIsFlowchartModalOpen(true)}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                플로우 차트
              </button>
              <div id="new-02-create-link" className="relative">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="rounded bg-[#8bc34a] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#7cb342]"
                >
                  연동 추가
                </button>
                <NewFeatureBadge
                  id="NEW-02"
                  showBadge={highlightEnabled}
                  tooltipText={[
                    "운영자는 본(부모) 계정과 CPS(자식) 계정을 1:1로 연동(Create)",
                    "연동 시 두 계정이 서로 다른 계정인지 validation",
                    "성공 시 연동 상태/CPS 계정 ID/연동 완료 일자 즉시 반영",
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* 사용자 관리 탭일 때 타이틀 */}
        {activeTab === "user" && (
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">사용자 관리</h1>
          </div>
        )}

        <div id="new-01-menu" className="relative mb-4 flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("user")}
            className={`border-b-2 px-4 py-2 text-sm ${
              activeTab === "user"
                ? "border-[#8bc34a] font-medium text-gray-800"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            사용자 관리
          </button>
          <div className="relative">
            <button
              onClick={() => setActiveTab("cps")}
              className={`border-b-2 px-4 py-2 text-sm ${
                activeTab === "cps"
                  ? "border-[#8bc34a] font-medium text-gray-800"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              CPS 계정 연동 관리
            </button>
            <NewFeatureBadge
              id="NEW-01"
              showBadge={highlightEnabled}
              position="top-right"
              tooltipText={["사용자 관리 내 'CPS 계정 연동 관리' 신규 메뉴 추가"]}
            />
          </div>
        </div>

        {activeTab === "cps" ? (
          <>
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              salesFilter={salesFilter}
              onSalesFilterChange={setSalesFilter}
              operationFilter={operationFilter}
              onOperationFilterChange={setOperationFilter}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              salesManagers={salesManagers}
              operationManagers={operationManagers}
            />
            <div
              id="new-03-read-list"
              className={`relative ${highlightEnabled ? "rounded-lg ring-2 ring-[#8bc34a] ring-offset-2" : ""}`}
            >
              <NewFeatureBadge
                id="NEW-03"
                showBadge={highlightEnabled}
                position="top-left"
                tooltipDirection="right"
                tooltipText={[
                  "연동 완료된 광고주만 조회(Read)",
                  "컬럼: 광고주 정보, CPS 계정 ID, 연동 상태, 연동 완료/해제 일자",
                  "연동일 기준 내림차순",
                ]}
              />
              <CPSDataTable
                data={filteredIntegrations}
                onDisconnectClick={handleDisconnectClick}
                highlightEnabled={highlightEnabled}
              />
            </div>
          </>
        ) : (
          <>
            <UserManagementFilters
              searchQuery={userSearchQuery}
              onSearchChange={setUserSearchQuery}
              totalCount={27531}
              filteredCount={filteredUsers.length > 0 ? 1054 : 0}
            />
            <UserManagementTable data={filteredUsers} />
          </>
        )}
      </main>

      {/* Modals */}
      <PolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
      <FlowchartModal isOpen={isFlowchartModalOpen} onClose={() => setIsFlowchartModalOpen(false)} />
      <AddIntegrationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIntegration}
      />
      <DisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={handleDisconnectModalClose}
        onConfirm={handleDisconnect}
        onRefreshList={handleRefreshList}
        advertiserName={disconnectTargetName}
      />

      <NewFeatureDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigateToFeature}
      />
    </div>
  )
}
