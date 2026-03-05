"use client"

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">CPS 계정 연동 관리 정책</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
          <div className="space-y-6 text-sm text-gray-700">
            {/* 프로젝트 개요 및 목적 */}
            <section>
              <h3 className="mb-2 font-bold text-gray-800">프로젝트 개요 및 목적</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>
                  광고 사업부는 CPS 코드를 기반으로 매출 증대를 목표로 하며, 내부 리타겟팅 모수를 보유하면서도 CPS 코드로 광고를 집행할 수 있는 광고주를 선별 운영 중이다.
                </li>
                <li>
                  앱 광고주는 웹 매칭 URL을 활용해 타 계정에서도 광고 집행이 가능하지만, 웹 광고주는 CDP 모수 추출·적재 및 업데이트를 반복 수행해야 하는 운영 불편이 존재한다.
                </li>
                <li>
                  이에 따라 웹 계정도 타 계정에서 특정 계정의 리타겟팅 모수를 활용할 수 있도록 계정 연동 관리 기능이 필요하다.
                </li>
              </ul>

              <div className="mt-3 rounded bg-gray-50 p-3">
                <p className="text-xs text-gray-500">
                  정책 요약: 부모 계정의 ‘장바구니/상품조회’ 모수를 자식(CPS) 계정 ID 기준으로 연동 및 이중 적재하여 활용한다.
                </p>
              </div>
            </section>
            
            {/* 기획 및 정책 정의 */}
            <section>
              <h3 className="mb-2 font-bold text-gray-800">기획 및 정책 정의</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>부모 계정의 장바구니/상품조회 모수를 자식 계정 ID로 2중 적재하는 방식으로 개발한다.</li>
                <li>최고관리자 &gt; 사용자 관리에 ‘CPS 계정 연동 관리’ 메뉴를 통해 부모-자식 계정 연동을 관리한다.</li>
                <li>광고주센터 4.0 광고 세팅에서는 CPS 계정 연동 시 스태틱으로만 세팅 가능하도록 제한한다.</li>
              </ul>
            </section>

            {/* Create */}
            <section>
              <h3 className="mb-2 font-bold text-gray-800">Create (연동 생성)</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>본 계정(부모 계정)과 CPS 계정(자식 계정)은 1:1로만 연동 가능</li>
                <li>연동 시 서로 다른 계정인지 validation 필수</li>
                <li>연동 성공 시 연동 상태, CPS 계정 ID, 연동 완료 일자가 리스트에 즉시 반영</li>
                <li className="mt-2 text-blue-600">
                  CPS 계정은 계정명 또는 광고주 계정 ID에 CPS가 포함된 계정으로 식별된다.
                </li>
                <li className="text-blue-600">CPS 계정으로 식별되지 않는 계정은 연동 대상이 될 수 없다.</li>
              </ul>
            </section>

            {/* Read */}
            <section>
              <h3 className="mb-2 font-bold text-gray-800">Read (조회)</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li className="mt-2 text-blue-600">
                  CPS 계정 연동 관리 화면에서는 연동 완료된 광고주만 조회</li>
                <li>광고주 정보, CPS 계정 ID, 연동 상태, 연동 완료 일자, 연동 해제 일자 제공</li>
                <li>연동일 기준 내림차순 정렬</li>
              </ul>
            </section>

            {/* Update */}
            <section>
              <h3 className="mb-2 font-bold text-gray-800">Update (수정)&Delete (해제)</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li className="mt-2 text-blue-600">
                이미 연동된 본 계정에 대해 연동 해제(상태 변경) 가능</li>
                <li>연동 해제 시 CPS 계정은 신규 모수 적재 및 부모 계정 기반 모수(장바구니, 상품조회) 사용 불가</li>
                <li className="mt-2 text-blue-600">
                연동 해제 시 상태 변경 및 변경 일자 조회 리스트에 반영</li>
              </ul>
            </section>
          </div>

          {/* Warning */}
          <div className="mt-6 rounded bg-red-50 p-3">
            <p className="text-sm font-medium text-red-600">
              ※ 주의: 본 정책 안내 UI는 실제 서비스 화면에 반영되지 않으며, 운영자 이해를 돕기 위한 안내 목적의
              화면입니다.
            </p>
          </div>

          <div className="mt-3 rounded bg-red-50 p-3">
            <p className="text-sm font-medium text-red-600">
              ※ 프로토타입에 사용된 데이터는 가상 데이터라 실제 데이터와 불일치 합니다.
            </p>
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
