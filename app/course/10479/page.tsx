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

export default function ComputerScienceCoursePage() {
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
            <span className="text-gray-900">이미지 영상 AI로 만들기</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white text-green-600 mb-4">전사교육</Badge>
            <h1 className="text-4xl font-bold mb-4">AI/DX 임직원을 위한 AI 실무 워크숍</h1>
            <p className="text-lg mb-6 opacity-90">AI 학습 계획표</p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="font-bold">4.9</span>
                <span className="opacity-80">(24)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>32+ 명 수강</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>총 8시간</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              {/* <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3">
                지금 수강하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 bg-transparent"
              >
                미리보기
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {user ? (
        // All the existing course content goes here
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Course Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">강의 소개</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    이 강의는 AI 도구를 활용해 누구나 쉽게 영상 콘텐츠를 기획-제작하는 실습형 입문 과정입니다.
                    기획(시나리오·대본·프롬프트)부터 이미지·음성 생성, 영상 편집, 자막 삽입, 최종 렌더링까지의 전 과정을
                    2일 동안 단계별로 따라 하며, 사내 인원도 홈페이지·SNS용 영상을 직접 만들 수 있도록 돕습니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    ChatGPT, ImageFX, Supertone AI, Hedra AI, CapCut, Vrew, Canva 등 각 도구의 장점과 선택 이유를 명확히
                    설명하고, 자동화·고퀄리티·시간 절감이라는 AI 활용의 핵심 가치를 체감할 수 있게 구성했습니다.
                  </p>
                  <p className="text-gray-700">
                    비전공자도 쉽게 따라할 수 있도록 기초부터 차근차근 설명하며, 실습과 예제를 통해 이론을 실제로
                    적용해볼 수 있습니다.
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">학습 목표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>AI 기반 영상 제작 전체 워크플로 이해 및 실습</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>ChatGPT를 이용한 시나리오·대본·프롬프트 작성 능력 습득</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>ImageFX·Canva로 고품질 스틸 이미지 및 배경 생성</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Hedra AI로 립싱크 모델 영상 제작, Supertone AI로 자연스러운 나레이션 생성</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>CapCut·Vrew를 활용한 편집·자막 자동화 및 품질 개선</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      각 단계 산출물(기획 문서, 이미지, 음성, 영상)을 체계적으로 관리하고 재활용하는 방법 습득
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              <div className="mb-8">
                <CompleteButton lectureId="computer-science-beginners" />
              </div>

              {/* Curriculum */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
                <div className="space-y-4">
                  {/* Section 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">섹션 1. AI/DX 임직원을 위한 AI 실무 워크숍</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>10분</span>
                        </div>
                      </div>

                      {/* YouTube Video Embed */}
                      <div className="mb-4">
                        <div className="aspect-video w-full">
                          <iframe
                            ref={iframeRef}
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/nqekmDbsKvo?enablejsapi=1"
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
                            00:00 AI영상
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(25)}
                          >
                            00:25 에아트 오프닝 AI 영화 제작
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(50)}
                          >
                            00:50 이 외의 꿀팁을 원하신다면!
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(71)}
                          >
                            01:11 AI 영상에 왜 vfx 효과 영상을 넣을까?
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(115)}
                          >
                            01:55 실전편 - VFX 효과 넣기
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(621)}
                          >
                            10:21 어떻게 적용시키면 되나?
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(628)}
                          >
                            10:28 꿀팁 대방출!
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Play className="w-4 h-4 text-gray-400" />
                          <span
                            className="cursor-pointer hover:text-green-600 transition-colors"
                            onClick={() => handleTimestampClick(643)}
                          >
                            10:43 이외의 필모라 기능
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
                        <Link
                          href="https://www.youtube.com/@%EC%97%90%EC%95%84%ED%8A%B8_AITryout"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h3 className="font-bold text-lg mb-2 hover:text-green-600 cursor-pointer transition-colors">
                            에아트 김태우 대표
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4">
                          3.1만 유튜브 외 5개 유튜브를 운영하며, ai 영상을 만들어 영상을 모르는 사람들도 쉽게영상을 만들
                          수 있게 도와줍니다.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>15개 강의</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>25,000+ 수강생</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4.8 평점</span>
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
                          <span className="font-medium">4강의</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">총 학습 시간</span>
                          <span className="font-medium">8시간</span>
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
                        <span>chat gpt</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>학습에 대한 열정</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>AI 경험 불필요</span>
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
                      <Badge variant="outline">초보자</Badge>
                      <Badge variant="outline">동영상</Badge>
                      <Badge variant="outline">기초</Badge>
                      <Badge variant="outline">입문</Badge>
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
