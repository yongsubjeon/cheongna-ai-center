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

export default function AITrendsPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, signOut } = useAuth()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleTimestampClick = (seconds: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${seconds}, true]}`, "*")
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
            <span className="text-gray-900">AI 활용 동향</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">S</span>
              </div>
            </div>
            <h3 className="font-bold text-3xl text-green-600 mb-2">전사교육</h3>
            <Badge className="bg-green-500 text-white mb-6">Part 1</Badge>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              AI 활용 동향. 에너지 운영현장 중심 AI 도입 사례 공유
            </h1>
            <p className="text-lg mb-6 text-gray-600">
              에너지 산업의 최신 AI 활용 트렌드와 실제 현장에서의 성공적인 도입 사례를 살펴봅니다.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">5.0</span>
                <span className="text-gray-600">(2,315)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>29,300+ 명 수강</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
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
                    에너지 산업에서 AI 기술이 어떻게 활용되고 있는지, 실제 운영 현장에서의 도입 사례를 통해 알아봅니다.
                    스마트 그리드, 에너지 예측, 설비 관리 최적화 등 다양한 분야에서 AI가 만들어낸 혁신적인 변화를 함께
                    살펴보겠습니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    전 세계 에너지 기업들의 성공 사례와 청라에너지의 실제 도입 경험을 바탕으로, AI 기술이 에너지 산업의
                    미래를 어떻게 변화시키고 있는지 구체적으로 이해할 수 있습니다.
                  </p>
                  <p className="text-gray-700">
                    기술적 배경 지식이 없어도 이해하기 쉽게 설명되어 있으며, 실무에 바로 적용할 수 있는 인사이트를
                    제공합니다.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">학습 목표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>글로벌 에너지 산업의 AI 활용 트렌드 이해</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>스마트 그리드 운영을 위한 AI 솔루션</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>에너지 수요 예측 및 최적화 기법</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>설비 유지보수를 위한 예지정비 시스템</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>실제 도입 사례를 통한 ROI 분석</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>AI 도입 시 고려해야 할 실무 포인트</span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              <div className="mb-8">
                <CompleteButton lectureId="ai-trends-energy" />
              </div>

              {/* Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
                <div className="space-y-4">
                  {/* Section 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 1. AI 활용 동향과 에너지 산업의 변화</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>2시간</span>
                        </div>
                      </div>

                      {/* YouTube Video Embed */}
                      <div className="mb-4">
                        <div className="aspect-video w-full">
                          <iframe
                            ref={iframeRef}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Tvh50Xog3H4?enablejsapi=1"
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
                            00:00 강의 소개
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(300)}
                          >
                            05:00 글로벌 AI 활용 트렌드
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(900)}
                          >
                            15:00 에너지 산업의 디지털 전환
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(1800)}
                          >
                            30:00 스마트 그리드 AI 솔루션
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(3600)}
                          >
                            60:00 실제 도입 사례 분석
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(5400)}
                          >
                            90:00 청라에너지 사례 공유
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
                        <h3 className="font-bold text-lg mb-2">김영한</h3>
                        <p className="text-gray-600 mb-4">
                          에너지 산업 AI 전문가로, 다수의 에너지 기업에서 AI 시스템 도입 및 컨설팅 경험을 보유하고
                          있습니다. 청라에너지의 디지털 전환을 이끌고 있습니다.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>12개 강의</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>50,000+ 수강생</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4.9 평점</span>
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
                          <span className="font-medium">1강의</span>
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
                        <span>에너지 산업에 대한 기본 이해</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>AI 기술에 대한 관심</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>사전 기술 지식 불필요</span>
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
                      <Badge variant="outline">에너지</Badge>
                      <Badge variant="outline">스마트그리드</Badge>
                      <Badge variant="outline">전사교육</Badge>
                      <Badge variant="outline">초급</Badge>
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
