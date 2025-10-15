"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, Star, Users, Clock, Play, CheckCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "@/components/login-modal"
import CompleteButton from "@/components/CompleteButton"

export default function AITrendsMaterialsPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, signOut } = useAuth()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeRef2 = useRef<HTMLIFrameElement>(null)

  const handleTimestampClick = (seconds: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${seconds}, true]}`, "*")
    }
  }

  const handleTimestampClick2 = (seconds: number) => {
    if (iframeRef2.current && iframeRef2.current.contentWindow) {
      iframeRef2.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${seconds}, true]}`, "*")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-green-500 font-bold text-xl">
                청라에너지
              </Link>
              <div className="flex items-center space-x-6">
                <span className="font-medium">강의</span>
                <span>로드맵</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>한국어</span>
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
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              홈
            </Link>
            <span>{">"}</span>
            <Link href="/courses" className="hover:text-green-600">
              강의
            </Link>
            <span>{">"}</span>
            <span className="text-gray-900">AI 트렌드 교육자료</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-300 to-blue-300 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-purple-800">
            <Badge className="bg-white text-purple-800 mb-4">핵심역량 교육</Badge>
            <h1 className="text-4xl font-bold mb-4">AI 트렌드 교육자료</h1>
            <p className="text-lg mb-6 opacity-90">
              최신 AI 트렌드와 기술 동향을 파악하고, 실무에 적용할 수 있는 인사이트를 얻습니다.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="font-bold">5.0</span>
                <span className="opacity-80">(0)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>0+ 명 수강</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>총 2시간</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {user ? (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Course Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">강의 소개</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    AI 기술의 최신 트렌드와 산업별 적용 사례를 학습합니다. ChatGPT, Midjourney, Stable Diffusion 등 최신
                    생성형 AI 도구들의 발전 방향과 실무 활용 방법을 이해할 수 있습니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    글로벌 AI 기업들의 최신 발표와 기술 동향을 분석하고, 에너지 산업에서의 AI 적용 가능성을 탐색합니다.
                    실제 사례를 통해 AI 기술이 어떻게 비즈니스 혁신을 이끌어내는지 배웁니다.
                  </p>
                  <p className="text-gray-700">
                    AI 트렌드를 이해하고 조직에 적용하기 위한 전략적 인사이트를 제공합니다.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">학습 목표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>최신 AI 기술 트렌드 이해</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>생성형 AI 도구의 발전 방향</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>산업별 AI 적용 사례 분석</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>에너지 산업의 AI 활용 전략</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>글로벌 AI 기업 동향 파악</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>조직 내 AI 도입 전략 수립</span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              <div className="mb-8">
                <CompleteButton lectureId="ai-trends-materials" />
              </div>

              {/* Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
                <div className="space-y-4">
                  {/* Section 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 1. AI 트렌드와 미래 전망</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>1시간</span>
                        </div>
                      </div>

                      {/* YouTube Video Embed */}
                      <div className="mb-4">
                        <div className="aspect-video w-full">
                          <iframe
                            ref={iframeRef}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/UIBLOK6XCCA?enablejsapi=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(0)}
                          >
                            00:00 인트로
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(21)}
                          >
                            00:21 구독자 인사
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(80)}
                          >
                            01:20 뇌를 연구하는 학문과 AI 연구와의 공통점
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(502)}
                          >
                            08:22 혁명의 대명사 애플이 AI 경쟁에 뒤처진 이유
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(909)}
                          >
                            15:09 10년 안에 나올 스마트폰 이상의 혁명
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(1271)}
                          >
                            21:11 지금이라도 한국형 AI가 필요한 이유
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(1602)}
                          >
                            26:42 '10년도 안 남았다' AI가 가져올 완전히 다른 세상
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(1879)}
                          >
                            31:19 자본주의, 민주주의를 모두 뒤흔들 AGI
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 2 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 2. AI가 절대 대체하지 못할 사람 (김대식 교수)</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>1시간</span>
                        </div>
                      </div>

                      {/* YouTube Video Embed */}
                      <div className="mb-4">
                        <div className="aspect-video w-full">
                          <iframe
                            ref={iframeRef2}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/mOGzaJRFv2E?enablejsapi=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(0)}
                          >
                            00:00 인트로
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(22)}
                          >
                            00:22 구독자 인사
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(24)}
                          >
                            00:24 미국 대기업에서 급속도로 퇴출당하고 있는 직무
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(318)}
                          >
                            05:18 '한국도 예외 아니다' AI 시대에 먼저 해고될 사람
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(604)}
                          >
                            10:04 미래 시대에 코딩보다 필요한 교육
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(923)}
                          >
                            15:23 AI 시대에 살아남기 위해 지금 당장 해야할 것
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(1246)}
                          >
                            20:46 AGI 시대는 디스토피아일까, 유토피아일까?
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick2(1360)}
                          >
                            22:40 AGI 시대 인간은 모두 '어린 아이'가 됩니다
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">강사 소개</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <User className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-2">도슨티</h3>
                        <p className="text-gray-600 mb-4">
                          AI 기술 전문가로, 최신 AI 트렌드와 산업 적용 사례에 대한 깊은 인사이트를 보유하고 있습니다.
                          다양한 기업의 AI 도입 컨설팅 경험을 바탕으로 실무 중심의 교육을 제공합니다.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>8개 강의</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>2,500+ 수강생</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>5.0 평점</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Course Info Card */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">₩0</div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3">
                        청라에너지 무료수강
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold">강의 정보</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">총 강의 수</span>
                          <span className="font-medium">2강의</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">총 학습 시간</span>
                          <span className="font-medium">2시간</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">난이도</span>
                          <span className="font-medium">초급</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">수료증</span>
                          <span className="font-medium">제공</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">평생 수강</span>
                          <span className="font-medium">가능</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prerequisites */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">수강 전 필요한 지식</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>AI에 대한 기본적인 관심</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>기술 트렌드에 대한 이해</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>전문 지식 불필요</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">태그</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">AI트렌드</Badge>
                      <Badge variant="outline">생성형AI</Badge>
                      <Badge variant="outline">기술동향</Badge>
                      <Badge variant="outline">산업적용</Badge>
                      <Badge variant="outline">미래전망</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">이 강의를 수강하려면 먼저 로그인해주세요.</p>
            <Button onClick={() => setShowLoginModal(true)} className="bg-green-500 hover:bg-green-600 px-8 py-3">
              로그인하기
            </Button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-white text-xs">문의하기</span>
        </button>
      </div>
    </div>
  )
}
