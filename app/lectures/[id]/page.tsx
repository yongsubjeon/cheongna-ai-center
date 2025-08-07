import { createServerSupabase } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import CompleteButton from "@/components/CompleteButton"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, User } from "lucide-react"
import Link from "next/link"

interface LecturePageProps {
  params: {
    id: string
  }
}

export default async function LecturePage({ params }: LecturePageProps) {
  const supabase = createServerSupabase()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // 강의 정보 조회
  const { data: lecture, error: lectureError } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", params.id)
    .single()

  if (lectureError || !lecture) {
    notFound()
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
              <div className="flex items-center space-x-2">
                <span className="text-sm">{user.email}</span>
              </div>
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
            <Link href="/lectures" className="hover:text-green-600">
              강의
            </Link>
            <span>{">"}</span>
            <span className="text-gray-900">{lecture.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white text-green-600 mb-4">강의</Badge>
            <h1 className="text-4xl font-bold mb-4">{lecture.title}</h1>
            <p className="text-lg mb-6 opacity-90">청라에너지 AI 교육 과정</p>
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
                <span>총 1시간</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Complete Button - 강의 제목 바로 아래 */}
            <div className="mb-8">
              <CompleteButton lectureId={params.id} />
            </div>

            {/* Video Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">강의 영상</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={lecture.video_url}
                      title={lecture.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">강의 소개</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  이 강의는 AI 도구를 활용해 누구나 쉽게 영상 콘텐츠를 기획-제작하는 실습형 입문 과정입니다.
                  기획(시나리오·대본·프롬프트)부터 이미지·음성 생성, 영상 편집, 자막 삽입, 최종 렌더링까지의 전 과정을
                  단계별로 따라 하며, 사내 인원도 홈페이지·SNS용 영상을 직접 만들 수 있도록 돕습니다.
                </p>
                <p className="text-gray-700 mb-4">
                  ChatGPT, ImageFX, Supertone AI, Hedra AI, CapCut, Vrew, Canva 등 각 도구의 장점과 선택 이유를 명확히
                  설명하고, 자동화·고퀄리티·시간 절약이라는 AI 활용의 핵심 가치를 체감할 수 있게 구성했습니다.
                </p>
                <p className="text-gray-700">
                  비전공자도 쉽게 따라할 수 있도록 기초부터 차근차근 설명하며, 실습과 예제를 통해 이론을 실제로 적용해볼
                  수 있습니다.
                </p>
              </div>
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
                    <p className="text-sm text-gray-600">청라에너지 무료 교육</p>
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
                        <span className="font-medium">1시간</span>
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

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-white text-xs">문의하기</span>
        </button>
      </div>
    </div>
  )
}
