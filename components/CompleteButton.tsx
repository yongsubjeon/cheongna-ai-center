"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"

interface CompleteButtonProps {
  lectureId: string
}

export default function CompleteButton({ lectureId }: CompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // 미로그인 시 로그인 페이지로 리다이렉트
        router.push("/login")
        return
      }
      checkCompletionStatus()
    }
  }, [user, authLoading, lectureId, router])

  const checkCompletionStatus = async () => {
    if (!user) return

    try {
      setError(null)

      // First, try to find the lecture by ID (if it's a UUID)
      let actualLectureId = lectureId

      // If lectureId is not a UUID format, try to find the lecture by title
      if (!isValidUUID(lectureId)) {
        const { data: lecture, error: lectureError } = await supabase
          .from("lectures")
          .select("id")
          .eq("title", "생성형 AI 이미지 영상 만들기")
          .single()

        if (lectureError && lectureError.code === "PGRST116") {
          // Lecture doesn't exist, but we shouldn't create it here
          // Instead, we'll use a default lecture ID or handle this case differently
          console.error("Lecture not found:", lectureError)
          setError("강의 정보를 찾을 수 없습니다. 관리자에게 문의하세요.")
          setIsInitialLoading(false)
          return
        } else if (lectureError) {
          console.error("Error finding lecture:", lectureError)
          setError("강의 정보를 찾을 수 없습니다.")
          setIsInitialLoading(false)
          return
        } else {
          actualLectureId = lecture.id
        }
      }

      const { data, error } = await supabase
        .from("lecture_progress")
        .select("completed")
        .eq("lecture_id", actualLectureId)
        .eq("user_id", user.id)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error checking completion status:", error)
        setError("진행 상태를 확인할 수 없습니다.")
        return
      }

      setIsCompleted(data?.completed || false)
    } catch (error) {
      console.error("Error checking completion status:", error)
      setError("진행 상태를 확인할 수 없습니다.")
    } finally {
      setIsInitialLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get the actual lecture ID
      let actualLectureId = lectureId

      if (!isValidUUID(lectureId)) {
        const { data: lecture, error: lectureError } = await supabase
          .from("lectures")
          .select("id")
          .eq("title", "생성형 AI 이미지 영상 만들기")
          .single()

        if (lectureError) {
          console.error("Error finding lecture:", lectureError)
          setError("강의 정보를 찾을 수 없습니다. 관리자에게 문의하세요.")
          return
        }

        actualLectureId = lecture.id
      }

      const { error } = await supabase.from("lecture_progress").upsert(
        {
          user_id: user.id,
          lecture_id: actualLectureId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,lecture_id",
          ignoreDuplicates: false,
        },
      )

      if (error) {
        console.error("Error updating completion status:", error)
        setError("수강 완료 처리 중 오류가 발생했습니다.")
        return
      }

      setIsCompleted(true)
    } catch (error) {
      console.error("Error updating completion status:", error)
      setError("수강 완료 처리 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to check if string is a valid UUID
  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(str)
  }

  // 인증 로딩 중
  if (authLoading) {
    return (
      <Button className="bg-gray-400 text-white rounded-md py-3 px-6 mt-4 w-full" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        로딩 중...
      </Button>
    )
  }

  // 미로그인 상태
  if (!user) {
    return (
      <Button
        onClick={() => router.push("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 px-6 mt-4 w-full"
      >
        로그인하여 수강하기
      </Button>
    )
  }

  // 초기 로딩 중
  if (isInitialLoading) {
    return (
      <Button className="bg-gray-400 text-white rounded-md py-3 px-6 mt-4 w-full" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        진행 상태 확인 중...
      </Button>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="mt-4">
        <Button
          onClick={checkCompletionStatus}
          className="bg-red-600 hover:bg-red-700 text-white rounded-md py-3 px-6 w-full mb-2"
        >
          다시 시도
        </Button>
        <p className="text-red-600 text-sm text-center">{error}</p>
      </div>
    )
  }

  // 완료된 상태
  if (isCompleted) {
    return (
      <Button className="bg-green-600 text-white rounded-md py-3 px-6 mt-4 w-full disabled:opacity-60" disabled>
        <CheckCircle className="w-5 h-5 mr-2" />
        수강 완료됨
      </Button>
    )
  }

  // 완료 가능한 상태
  return (
    <Button
      onClick={handleComplete}
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700 text-white rounded-md py-3 px-6 mt-4 w-full disabled:opacity-60 transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          처리 중...
        </>
      ) : (
        "수강 완료"
      )}
    </Button>
  )
}
