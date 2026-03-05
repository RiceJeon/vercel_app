"use client"

import type { User } from "@/lib/dummy-data"
import { UserIcon, Pencil, ChevronDown } from "lucide-react"

interface UserManagementTableProps {
  data: User[]
}

export function UserManagementTable({ data }: UserManagementTableProps) {
  return (
    <div className="overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="w-full min-w-[1400px] text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-3 py-2 text-center font-medium text-gray-600">정보관리</th>
            <th className="px-3 py-2 text-left font-medium text-gray-600">
              <div className="flex items-center gap-1">
                가입일
                <ChevronDown className="h-3 w-3" />
              </div>
            </th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">상태</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">구분/권한</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">영업 담당자</th>
            <th className="px-3 py-2 text-left font-medium text-gray-600">회사명 / 회사 담당자 / 담당자 연락처</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">대행사</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">아이디</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">카테고리</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">성별</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">연령대</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">URL</th>
            <th className="px-3 py-2 text-center font-medium text-gray-600">스크립트</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-3 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <UserIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              </td>
              <td className="px-3 py-2 text-gray-600">{user.joinedAt}</td>
              <td className="px-3 py-2 text-center">
                <span className={`text-sm font-medium ${user.status === "라이브" ? "text-[#79bd2f]" : "text-red-500"}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-3 py-2 text-center">
                <span className={user.type === "대행사" ? "text-red-500" : "text-gray-600"}>{user.type}</span>
              </td>
              <td className="px-3 py-2 text-center text-gray-600">{user.salesManager}</td>
              <td className="px-3 py-2">
                <div className="flex flex-col">
                  <a href="#" className="text-blue-600 hover:underline">
                    {user.companyName}
                  </a>
                  <span className="text-xs text-gray-500">
                    {user.contactPerson} {user.contactPhone}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2 text-center text-gray-600">{user.agency}</td>
              <td className="px-3 py-2 text-center text-gray-600">{user.userId}</td>
              <td className="px-3 py-2 text-center text-gray-600">{user.category}</td>
              <td className="px-3 py-2 text-center text-gray-600">{user.gender}</td>
              <td className="px-3 py-2 text-center text-gray-600">{user.ageRange}</td>
              <td className="px-3 py-2 text-center">
                {user.url && (
                  <div className="flex items-center justify-center gap-1">
                    <a
                      href={`https://${user.url}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.url}
                    </a>
                    <button className="rounded bg-gray-100 p-1 hover:bg-gray-200">
                      <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
              <td className="px-3 py-2 text-center text-gray-500">{user.scriptStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
