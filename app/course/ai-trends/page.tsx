"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function AITrendsCourse() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">AI 활용 동향. 에너지 운영현장 중심 AI 도입 사례 공유</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>29,300+ 수강생</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span>5.0 (2,315)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>전사교육</span>
                </div>
              </div>
            </div>
            <Badge className="bg-blue-500 text-white">입문 활용</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video and Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">섹션 1: AI 활용 동향 및 에너지 운영현장 사례</h2>

                  {/* YouTube Video Embed */}
                  <div className="mb-4">
                    <div className="aspect-video w-full">
                      <iframe
                        ref={iframeRef}
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                        title="AI 활용 동향"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3">강의 소개</h3>
                  <p className="text-gray-700 mb-4">
                    이 강의에서는 최신 AI 활용 동향과 에너지 운영현장에서의 실제 AI 도입 사례를 다룹니다. 청라에너지의
                    현장 경험을 바탕으로 한 실무 중심의 내용으로 구성되어 있습니다.
                  </p>

                  <h3 className="text-lg font-semibold mb-3">학습 목표</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>최신 AI 기술 트렌드 이해</li>
                    <li>에너지 운영현장에서의 AI 활용 사례 학습</li>
                    <li>AI 도입 시 고려사항 파악</li>
                    <li>실무 적용 가능한 AI 솔루션 이해</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3 mt-6">강의 대상</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>에너지 산업 종사자</li>
                    <li>AI 기술에 관심있는 전 직원</li>
                    <li>현장 운영 담당자</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">강의 정보</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">강사</p>
                    <p className="font-semibold">김영한</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">카테고리</p>
                    <Badge className="bg-green-500 text-white">전사교육</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">난이도</p>
                    <Badge className="bg-blue-500 text-white">입문 활용</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">수강생</p>
                    <p className="font-semibold">29,300+명</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">평점</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">5.0</span>
                      <span className="text-gray-600 text-sm ml-1">(2,315)</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">수강하기</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
