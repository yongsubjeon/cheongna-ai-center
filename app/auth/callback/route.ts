import { createServerSupabase } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"
  const type = searchParams.get("type")
  const error = searchParams.get("error")
  const error_description = searchParams.get("error_description")

  // 에러가 있는 경우 처리
  if (error) {
    console.error("Auth callback error:", error, error_description)
    return NextResponse.redirect(
      `${origin}/?error=auth_error&message=${encodeURIComponent(error_description || error)}`,
    )
  }

  if (code) {
    const supabase = createServerSupabase()

    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error("Session exchange error:", exchangeError)
        return NextResponse.redirect(`${origin}/?error=auth_error&message=${encodeURIComponent(exchangeError.message)}`)
      }

      // 성공적으로 세션을 교환한 경우
      if (data.session) {
        // OAuth 로그인의 경우
        if (type !== "signup") {
          return NextResponse.redirect(`${origin}${next}`)
        }

        // 회원가입 후 OAuth 인증의 경우
        return NextResponse.redirect(`${origin}/?verified=true`)
      }
    } catch (error) {
      console.error("Unexpected auth callback error:", error)
      return NextResponse.redirect(`${origin}/?error=auth_error&message=unexpected_error`)
    }
  }

  // 코드가 없는 경우 에러 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/?error=auth_error&message=no_code_provided`)
}
