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

export default function WorkflowAutomationPage() {
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
            <span className="text-gray-900">노코드 워크플로우 자동화</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">AI</span>
              </div>
            </div>
            <h3 className="font-bold text-3xl text-purple-600 mb-2">핵심역량교육</h3>
            <Badge className="bg-purple-600 text-white mb-6">Part 1</Badge>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              노코드 워크플로우 자동화. 청라에너지 업무와 AI 자동화 개론
            </h1>
            <p className="text-lg mb-6 text-gray-600">
              노코드 도구를 활용하여 반복적인 업무를 자동화하고, AI를 통해 업무 효율성을 극대화하는 방법을 배웁니다.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">5.0</span>
                <span className="text-gray-600">(214)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>5,200+ 명 수강</span>
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
                    코딩 없이도 강력한 업무 자동화를 구현할 수 있는 노코드 도구들을 활용하여 청라에너지의 업무
                    프로세스를 혁신하는 방법을 배웁니다. Zapier, Make(Integromat), n8n 등 다양한 노코드 자동화 플랫폼을
                    실습하며, AI와 결합하여 더욱 스마트한 워크플로우를 구축합니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    반복적인 데이터 입력, 이메일 처리, 문서 생성, 알림 발송 등 일상적인 업무를 자동화하여 시간을
                    절약하고 실수를 줄일 수 있습니다. 실제 청라에너지의 업무 사례를 바탕으로 즉시 적용 가능한 자동화
                    시나리오를 학습합니다.
                  </p>
                  <p className="text-gray-700">
                    프로그래밍 경험이 없어도 괜찮습니다. 드래그 앤 드롭 방식의 직관적인 인터페이스로 누구나 쉽게 자동화
                    워크플로우를 만들 수 있습니다.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">학습 목표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>노코드 자동화 도구 활용법</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>워크플로우 설계 및 구축</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>AI와 자동화 도구 연동</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>업무 프로세스 최적화 전략</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>데이터 연동 및 통합 방법</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>자동화 모니터링 및 관리</span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              <div className="mb-8">
                <CompleteButton lectureId="workflow-automation" />
              </div>

              {/* Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
                <div className="space-y-4">
                  {/* Section 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 1. 노코드 워크플로우 자동화 실습</h3>
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
                            src="https://www.youtube.com/embed/tkaDX4QrlbQ?enablejsapi=1"
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
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(0)}
                          >
                            00:00 강의 소개 및 노코드 자동화 개요
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(300)}
                          >
                            05:00 노코드 도구 소개 및 선택 가이드
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(900)}
                          >
                            15:00 첫 번째 워크플로우 만들기
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(1800)}
                          >
                            30:00 AI와 자동화 도구 연동하기
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(3600)}
                          >
                            60:00 청라에너지 업무 자동화 사례
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(5400)}
                          >
                            90:00 고급 자동화 기법 및 Q&A
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
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-2">전용섭 디렉터</h3>
                        <p className="text-gray-600 mb-4">
                          도슨티의 디렉터로서 다양한 기업의 업무 자동화 및 디지털 전환을 지원하고 있습니다. 노코드
                          도구와 AI를 결합한 혁신적인 솔루션으로 업무 효율성을 극대화하는 전문가입니다.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>8개 강의</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>15,000+ 수강생</span>
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
                      <div className="text-3xl font-bold text-purple-600 mb-2">₩0</div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3">
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
                          <span className="font-medium">입문~중급</span>
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
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>기본적인 컴퓨터 활용 능력</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>업무 자동화에 대한 관심</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>프로그래밍 경험 불필요</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">태그</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">노코드</Badge>
                      <Badge variant="outline">자동화</Badge>
                      <Badge variant="outline">워크플로우</Badge>
                      <Badge variant="outline">AI</Badge>
                      <Badge variant="outline">업무효율화</Badge>
                      <Badge variant="outline">Zapier</Badge>
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
            <Button onClick={() => setShowLoginModal(true)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              로그인하기
            </Button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-white text-xs">문의하기</span>
        </button>
      </div>
    </div>
  )
}
