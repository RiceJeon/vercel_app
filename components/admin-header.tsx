export function AdminHeader() {
  const menuItems = [
    "매출관리",
    "상품정보수집현황",
    "실시간 광고송출리스트",
    "가상계좌",
    "품절배치관리",
    "이미지검수",
    "광고상품관리",
    "쿠폰관리",
    "타임보드",
    "비디오애드",
    "팝업관리",
  ]

  const menuItems2 = [
    "타겟팅보고",
    "일자별통계",
    "캠페인통계",
    "브라우저별 통계",
    "지역타겟팅통계",
    "데이터센터",
    "컨버전통계",
    "OpenRTB통계",
    "시간대별 소진",
    "시간대별 통계",
    "반송쿨통계",
    "키워드센터",
    "인사이트",
    "예산최적화",
    "ROAS분석",
  ]

  const menuItems3 = ["프레임RTB", "프리퀜시통계", "RFM통계", "계정관리"]

  const menuItems4 = [
    "광고주통계",
    "이벤트관리현황",
    "매체통계",
    "매체종합현황관리",
    "요청수통계",
    "애드익스통합",
    "세정링크설정",
    "소재검수",
    "크리에이티브통계",
    "소재/리워드 통계",
    "예산비중도",
    "다큐먼트",
    "인바운드관리",
    "CPC자동화",
    "노출제어",
  ]

  return (
    <header className="bg-[#2d2d2d] text-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold text-[#8bc34a]">MOBON</span>
          <nav className="flex items-center gap-6 text-sm">
            <span className="cursor-pointer hover:text-[#8bc34a]">매체</span>
            <span className="cursor-pointer hover:text-[#8bc34a]">광고주</span>
            <span className="cursor-pointer hover:text-[#8bc34a]">관리자</span>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-yellow-400">👤 개발지원본부_전상훈(관리자)님</span>
          <span className="text-gray-400">로그인중</span>
          <span className="text-gray-400">머니:0원</span>
          <button className="rounded border border-[#8bc34a] px-3 py-1 text-[#8bc34a] hover:bg-[#8bc34a] hover:text-white">
            정보수정
          </button>
          <button className="rounded border border-gray-500 px-3 py-1 text-gray-300 hover:bg-gray-600">Logout</button>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="bg-[#0081D5] px-6 py-2 text-xs">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="font-bold text-yellow-400">사용자관리</span>
          {menuItems.map((item, i) => (
            <span key={i} className="cursor-pointer text-gray-300 hover:text-white">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {menuItems2.map((item, i) => (
            <span key={i} className="cursor-pointer text-gray-300 hover:text-white">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {menuItems3.map((item, i) => (
            <span key={i} className="cursor-pointer text-gray-300 hover:text-white">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {menuItems4.map((item, i) => (
            <span key={i} className="cursor-pointer text-gray-300 hover:text-white">
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
