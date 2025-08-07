import { createServerSupabase } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, BookOpen } from 'lucide-react'
import Link from "next/link"

export default async function AdminProgressPage() {
  const supabase = createServerSupabase()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // 사용자별 진도 요약 조회
  const { data: userSummaries, error: userError } = await supabase
    .from("user_progress_summary")
    .select("*")
    .order("email")

  // 강의별 진도 요약 조회
  const { data: lectureSummaries, error: lectureError } = await supabase
    .from("lecture_progress_summary")
    .select("*")
    .order("lecture_title")

  // 상세 진도 정보 조회 (이메일 포함)
  const { data: detailedProgress, error: detailError } = await supabase
    .from("lecture_progress_with_user")
    .select("*")
    .order("email")

  if (userError || lectureError || detailError) {
    console.error("Error fetching progress data:", { userError, lectureError, detailError })
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">데이터를 불러올 수 없습니다</h2>
          <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
          <Link href="/" className="text-green-600 hover:text-green-700 underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-green-500 font-bold text-xl">
                청라에너지 관리자
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">학습 진도 관리</h1>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">총 학습자</p>
                  <p className="text-2xl font-bold">{userSummaries?.length || 0}명</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">총 강의</p>
                  <p className="text-2xl font-bold">{lectureSummaries?.length || 0}개</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">완료된 수강</p>
                  <p className="text-2xl font-bold">
                    {detailedProgress?.filter(p => p.completed).length || 0}건
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">진행 중인 수강</p>
                  <p className="text-2xl font-bold">
                    {detailedProgress?.filter(p => !p.completed).length || 0}건
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사용자별 진도 요약 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>사용자별 학습 진도</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">이메일</th>
                    <th className="text-left py-3 px-4">가입일</th>
                    <th className="text-left py-3 px-4">최근 로그인</th>
                    <th className="text-left py-3 px-4">시작한 강의</th>
                    <th className="text-left py-3 px-4">완료한 강의</th>
                    <th className="text-left py-3 px-4">완료율</th>
                  </tr>
                </thead>
                <tbody>
                  {userSummaries?.map((summary) => (
                    <tr key={summary.user_id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{summary.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(summary.user_created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {summary.last_sign_in_at 
                          ? new Date(summary.last_sign_in_at).toLocaleDateString('ko-KR')
                          : '없음'
                        }
                      </td>
                      <td className="py-3 px-4">{summary.total_lectures_started}</td>
                      <td className="py-3 px-4">{summary.completed_lectures}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={summary.completion_percentage >= 80 ? "default" : "secondary"}
                          className={summary.completion_percentage >= 80 ? "bg-green-500" : ""}
                        >
                          {summary.completion_percentage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 강의별 진도 요약 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>강의별 수강 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">강의명</th>
                    <th className="text-left py-3 px-4">총 수강생</th>
                    <th className="text-left py-3 px-4">완료한 학생</th>
                    <th className="text-left py-3 px-4">미완료 학생</th>
                    <th className="text-left py-3 px-4">완료율</th>
                  </tr>
                </thead>
                <tbody>
                  {lectureSummaries?.map((summary) => (
                    <tr key={summary.lecture_id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{summary.lecture_title}</td>
                      <td className="py-3 px-4">{summary.total_students}</td>
                      <td className="py-3 px-4 text-green-600">{summary.completed_students}</td>
                      <td className="py-3 px-4 text-orange-600">{summary.incomplete_students}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={summary.completion_rate >= 80 ? "default" : "secondary"}
                          className={summary.completion_rate >= 80 ? "bg-green-500" : ""}
                        >
                          {summary.completion_rate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 상세 진도 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>상세 학습 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">학습자</th>
                    <th className="text-left py-3 px-4">강의명</th>
                    <th className="text-left py-3 px-4">상태</th>
                    <th className="text-left py-3 px-4">시작일</th>
                    <th className="text-left py-3 px-4">완료일</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedProgress?.map((progress) => (
                    <tr key={`${progress.user_id}-${progress.lecture_id}`} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{progress.email}</td>
                      <td className="py-3 px-4">{progress.lecture_title}</td>
                      <td className="py-3 px-4">
                        <Badge variant={progress.completed ? "default" : "secondary"}>
                          {progress.completed ? "완료" : "진행중"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(progress.created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {progress.completed_at 
                          ? new Date(progress.completed_at).toLocaleDateString('ko-KR')
                          : '-'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
