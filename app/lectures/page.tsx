import { createServerSupabase } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, User } from "lucide-react"
import Link from "next/link"
import type { Lecture } from "@/lib/supabase/types"

export default async function LecturesPage() {
  const supabase = createServerSupabase()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // 강의 목록 조회
  const { data: lectures, error: lecturesError } = await supabase
    .from("lectures")
    .select("*")
    .order("title", { ascending: true })

  if (lecturesError) {
    console.error("Error fetching lectures:", lecturesError)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">강의를 불러올 수 없습니다</h2>
          <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
          <Link href="/" className="text-green-600 hover:text-green-700 underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white text-green-600 mb-4">강의 목록</Badge>
            <h1 className="text-4xl font-bold mb-4">청라에너지 AI 교육 과정</h1>
            <p className="text-lg mb-6 opacity-90">생성형 AI를 활용한 실무 교육</p>
          </div>
        </div>
      </div>

      {/* Lectures Grid */}
      <main className="container mx-auto px-4 py-12">
        {lectures && lectures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture: Lecture) => (
              <Link key={lecture.id} href={`/lectures/${lecture.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-sm bg-blue-500 px-2 py-1 rounded mb-2">AI 교육</div>
                        <h3 className="font-bold text-lg">강의</h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2 hover:text-green-600 line-clamp-2">{lecture.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">청라에너지</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">무료</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>4.9 (24)</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3" />
                        <span>32+</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3" />
                        <span>1시간</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-500 text-white text-xs mt-2">입문 활용</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">등록된 강의가 없습니다</h2>
            <p className="text-gray-600 mb-6">곧 새로운 강의가 추가될 예정입니다.</p>
            <Link href="/" className="text-green-600 hover:text-green-700 underline">
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-white text-xs">문의하기</span>
        </button>
      </div>
    </div>
  )
}
