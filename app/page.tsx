"use client"

import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Globe, User, X, Star, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function InflearnHomepage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const { user, signOut, loading } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    // URL 파라미터 확인
    const verified = searchParams.get("verified")
    const error = searchParams.get("error")
    const message = searchParams.get("message")

    if (verified === "true") {
      setShowVerificationMessage(true)
      // 5초 후 메시지 숨기기
      setTimeout(() => setShowVerificationMessage(false), 5000)
    }

    if (error === "auth_error") {
      setShowErrorMessage(true)
      setTimeout(() => setShowErrorMessage(false), 8000)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white">
      {/* 인증 완료 메시지 */}
      {showVerificationMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>이메일 인증이 완료되었습니다! 이제 로그인할 수 있습니다.</span>
          <button onClick={() => setShowVerificationMessage(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 에러 메시지 */}
      {showErrorMessage && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-md">
          <X className="w-5 h-5" />
          <div>
            <span>인증 처리 중 오류가 발생했습니다.</span>
            {searchParams.get("message") && (
              <div className="text-sm mt-1 opacity-90">{decodeURIComponent(searchParams.get("message") || "")}</div>
            )}
          </div>
          <button onClick={() => setShowErrorMessage(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Promotional Banner */}
      <Link href="https://padlet.com/docenty/chengna" target="_blank" rel="noopener noreferrer">
        <div className="text-white px-4 py-3 relative bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="text-center">
            <span className="font-bold">청라에너지 x 도슨티 DX 역량강화 교육 </span>
          </div>
          <p className="text-center text-sm mt-1 hover:underline">padlet 바로가기</p>
          <button className="absolute right-4 top-3">
            <X className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-8">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs sm:text-sm hidden sm:inline">교육</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <span className="hidden sm:inline">Our story</span>
              <Link href="http://www.e-cheongna.co.kr/" target="_blank" rel="noopener noreferrer">
                <span className="hover:text-green-600 cursor-pointer">청라에너지</span>
              </Link>
              <span className="hidden sm:inline">지식공유 참여</span>
              <Link href="https://www.docenty.ai" target="_blank" rel="noopener noreferrer">
                <span className="hover:text-green-600 cursor-pointer">도슨티 ai</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="font-bold text-lg sm:text-xl text-slate-700">청라에너지</div>
              <div className="flex items-center space-x-3 sm:space-x-6">
                <span className="font-medium text-sm sm:text-base">강의</span>
                <span className="text-sm sm:text-base">로드맵</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:block relative">
                <Input placeholder="내가 듣고 싶은 강의를 모든 곳에서 찾아보세요" className="w-80 pl-4 pr-10" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">한국어</span>
              </div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{user.email}</span>
                  <Button onClick={signOut} className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 sm:px-4 sm:py-2">
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-sm px-3 py-1 sm:px-4 sm:py-2"
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden border-b bg-white">
        <div className="container mx-auto px-2 py-3">
          <div className="relative">
            <Input placeholder="강의 검색..." className="w-full pl-4 pr-10 text-sm" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Category Icons */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8 overflow-x-auto">
              <div className="flex flex-col items-center space-y-1 sm:space-y-2 flex-shrink-0">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs">검색</span>
              </div>
              <div className="flex flex-col items-center space-y-1 sm:space-y-2 flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
                <span className="text-xs">전체</span>
              </div>
              <div className="flex flex-col items-center space-y-1 sm:space-y-2 flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
                <span className="text-xs">이미지생성</span>
              </div>
              <div className="flex flex-col items-center space-y-1 sm:space-y-2 flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
                <span className="text-xs whitespace-nowrap">로드맵 소개</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
            <Badge variant="outline" className="flex items-center space-x-1 text-xs whitespace-nowrap">
              <span>기술 검색</span>
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 text-xs whitespace-nowrap">
              AI 활용 🆕
            </Badge>
            <Badge variant="outline" className="bg-orange-50 text-orange-600 text-xs whitespace-nowrap">
              왕초보 👶
            </Badge>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <span className="text-xs sm:text-sm">추천순</span>
            <span className="text-xs sm:text-sm">▼</span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {/* Course Card 1 - Unity */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full">
                <Image
                  src="https://img.youtube.com/vi/nqekmDbsKvo/maxresdefault.jpg"
                  alt="AI 실무 활용 워크숍"
                  width={320}
                  height={180}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <CardContent className="p-4">
              <Link href="/course/10479">
                <h4 className="font-medium text-sm mb-2 hover:text-green-600 cursor-pointer">
                  전 임직원을 위한 AI 실무 활용 워크숍
                </h4>
              </Link>
              <p className="text-xs text-gray-600 mb-2">도슨티 이일구 대표</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">다시보기</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>4.9 (76)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>3,300+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 2 - AI Generation */}
          <Link href="/course/computer-science-beginners">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="aspect-video w-full">
                  <Image
                    src="/images/ai-generation-thumbnail.webp"
                    alt="AI로도 생성 가능"
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-green-600">생성형 AI 이미지 영상 만들기</h4>
                <p className="text-xs text-gray-600 mb-2">에아트 김태우 대표</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">다시보기</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (294)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3" />
                    <span>25</span>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Course Card 3 - Spring MVC */}
          <Link href="/course/ai-trends">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="aspect-video w-full">
                  <Image
                    src="/images/design-mode/maxresdefault.jpg"
                    alt="AI 활용 동향 강의"
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-green-600">
                  AI 활용 동향. 에너지 운영현장 중심 AI 도입 사례 공유
                </h4>
                <p className="text-xs text-gray-600 mb-2">구요한 대표</p>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-black ml-0">핵심역량</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>5.0 (2,315)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3" />
                    <span>29,300+</span>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Course Card 4 - Unity MMORPG */}
          <Link href="/course/ai-principles">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="aspect-video w-full">
                  <Image
                    src="https://img.youtube.com/vi/LXZD-l2nI2s/maxresdefault.jpg"
                    alt="생성형 AI 원리 이해"
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2 hover:text-green-600">
                  생성형 AI 원리 이해. 청라에너지형 AI 기술이해와 조직적용 전략
                </h4>
                <p className="text-xs text-gray-600 mb-2">전용섭 디렉터</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">전사교육</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (620)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3" />
                    <span>6,800+</span>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
              </CardContent>
            </Card>
          </Link>

          {/* Course Card 5 - Java Advanced */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">노코드 워크플로우 자동화. 청라에너지 업무와 AI 자동화 개론</h4>
              <p className="text-xs text-gray-600 mb-2">도슨티 전용섭 디렉터</p>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-black ml-0">핵심역량 교육</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (214)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>5,200+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 6 - Java Advanced Part 1 */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">생성형 AI로 회신 공문·보고서 작성 실무</h4>
              <p className="text-xs text-gray-600 mb-2">김영한</p>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold ml-0 text-black">핵심역량교육</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (371)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>7,600+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 7 - Game Programmer */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">엑셀 요금표 기반 납입계획표 생성 자동화</h4>
              <p className="text-xs text-gray-600 mb-2">Rookiss</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">핵심역량 교육</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (60)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>1,300+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 8 - Spring Boot */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-green-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">피벗·대시보드로 계약·공급 흐름 한눈에 보기</h4>
              <p className="text-xs text-gray-600 mb-2">토비</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">핵심역량 교육</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (357)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>6,600+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 9 - C++ MMORPG */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-gradient-to-r from-red-900 to-black flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="flex items-center justify-center mb-2"></div>
                  <h3 className="font-bold">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">자연어처리 이해. 고객 민원,계약 문의 응대를 위한 챗봇 구축</h4>
              <p className="text-xs text-gray-600 mb-2">ROOKISS</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">핵심역량 교육</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>4.9 (93)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>2,200+</span>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
            </CardContent>
          </Card>

          {/* Course Card 10 - C# Programming */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video w-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-bold text-purple-800">강의 준비 중 입니다.</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">데이터 시각화. 단지별 사용량/실적 분석 및 시각화</h4>
              <p className="text-xs text-gray-600 mb-2">Kaburi</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">핵심역량 교육</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (24)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3" />
                  <span>300+</span>
                </div>
              </div>
              <Badge className="bg-green-500 text-white text-xs mt-2">Update</Badge>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Padlet Embed */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">청라에너지 x 도슨티 DX 역량강화 교육</h2>
          <div className="w-full h-[600px] border rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://padlet.com/docenty/x-dx-ecwkyduztwwh5f1m"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="clipboard-write"
              title="청라에너지 x 도슨티 DX 역량강화 교육 Padlet"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-white text-xs font-bold">문의하기</span>
        </button>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}
