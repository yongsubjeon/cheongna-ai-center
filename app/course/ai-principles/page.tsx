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

export default function AIPrinciplesPage() {
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
            <span className="text-gray-900">생성형 AI 원리 이해</span>
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
            <h3 className="font-bold text-3xl text-purple-600 mb-2">전사교육</h3>
            <Badge className="bg-purple-600 text-white mb-6">Part 1</Badge>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              생성형 AI 원리 이해. 청라에너지형 AI 기술이해와 조직적용 전략
            </h1>
            <p className="text-lg mb-6 text-gray-600">
              생성형 AI의 핵심 원리를 이해하고, 청라에너지에 최적화된 AI 기술 적용 방안을 학습합니다.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">4.9</span>
                <span className="text-gray-600">(620)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>6,800+ 명 수강</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>총 2.5시간</span>
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
                    생성형 AI의 기본 원리부터 실무 적용까지, 청라에너지 조직에 최적화된 AI 전략을 수립하는 방법을
                    배웁니다. GPT, DALL-E 등 최신 생성형 AI 기술의 작동 원리와 이를 조직에 효과적으로 도입하는 전략을
                    학습합니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    AI 기술의 기초 지식이 없어도 이해할 수 있도록 구성되었으며, 실제 청라에너지의 업무 환경에서 활용할
                    수 있는 구체적인 사례와 함께 설명합니다.
                  </p>
                  <p className="text-gray-700">
                    조직의 디지털 전환을 이끌고자 하는 모든 임직원에게 필수적인 교육 과정입니다.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">학습 목표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>생성형 AI의 핵심 원리와 작동 방식 이해</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>GPT, DALL-E 등 주요 AI 모델 이해</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>청라에너지 업무에 AI 기술 적용 방안</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>조직 내 AI 도입 전략 수립</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>AI 윤리 및 책임있는 AI 활용</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span>실무 적용을 위한 구체적 사례 학습</span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              <div className="mb-8">
                <CompleteButton lectureId="ai-principles" />
              </div>

              {/* Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
                <div className="space-y-4">
                  {/* Section 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 1. 생성형 AI 원리와 조직 적용 전략</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>2.5시간</span>
                        </div>
                      </div>

                      {/* YouTube Video Embed */}
                      <div className="mb-4">
                        <div className="aspect-video w-full">
                          <iframe
                            ref={iframeRef}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/LXZD-l2nI2s?enablejsapi=1"
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
                            00:00 강의 소개 및 개요
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(420)}
                          >
                            07:00 생성형 AI란 무엇인가?
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(1200)}
                          >
                            20:00 GPT와 언어 모델의 이해
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(2400)}
                          >
                            40:00 이미지 생성 AI의 원리
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(3600)}
                          >
                            60:00 청라에너지 적용 사례
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => handleTimestampClick(5400)}
                          >
                            90:00 조직 적용 전략 및 Q&A
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
                          AI 기술 전문가로 다수의 기업에서 AI 도입 및 전략 수립 경험을 보유하고 있습니다. 도슨티에서
                          디지털 전환과 AI 기술 적용을 전문적으로 컨설팅하고 있습니다.
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
                          <span className="font-medium">2.5시간</span>
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
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>AI에 대한 관심과 학습 의지</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>기본적인 컴퓨터 활용 능력</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
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
                      <Badge variant="outline">생성형AI</Badge>
                      <Badge variant="outline">GPT</Badge>
                      <Badge variant="outline">AI원리</Badge>
                      <Badge variant="outline">전사교육</Badge>
                      <Badge variant="outline">디지털전환</Badge>
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
