"use client"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  salesFilter: string
  onSalesFilterChange: (value: string) => void
  operationFilter: string
  onOperationFilterChange: (value: string) => void
  sortOrder: "desc" | "asc"
  onSortOrderChange: (value: "desc" | "asc") => void
  salesManagers: string[]
  operationManagers: string[]
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  salesFilter,
  onSalesFilterChange,
  operationFilter,
  onOperationFilterChange,
  sortOrder,
  onSortOrderChange,
  salesManagers,
  operationManagers,
}: SearchFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="광고주명, 광고주 ID, 영업 담당자, 운영 담당자 입력"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-80 rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">영업 담당자</label>
        <select
          value={salesFilter}
          onChange={(e) => onSalesFilterChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none"
        >
          <option value="">전체</option>
          {salesManagers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">운영 담당자</label>
        <select
          value={operationFilter}
          onChange={(e) => onOperationFilterChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none"
        >
          <option value="">전체</option>
          {operationManagers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">연동일</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as "desc" | "asc")}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none"
        >
          <option value="desc">내림차순</option>
          <option value="asc">오름차순</option>
        </select>
      </div>

      <button className="rounded bg-[#8bc34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#7cb342]">검색</button>
    </div>
  )
}
