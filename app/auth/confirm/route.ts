import { createServerSupabase } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/"

  // 토큰 해시가 없는 경우
  if (!token_hash) {
    console.error("No token_hash provided")
    return NextResponse.redirect(`${origin}/?error=auth_error&message=no_token_provided`)
  }

  const supabase = createServerSupabase()

  try {
    // PKCE 플로우를 사용한 이메일 인증 처리
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    })

    if (error) {
      console.error("Email verification error:", error)
      return NextResponse.redirect(`${origin}/?error=auth_error&message=${encodeURIComponent(error.message)}`)
    }

    // 인증 성공
    if (data.session) {
      console.log("Email verification successful")
      return NextResponse.redirect(`${origin}/?verified=true`)
    }

    // 세션이 없는 경우
    return NextResponse.redirect(`${origin}/?error=auth_error&message=no_session_created`)
  } catch (error) {
    console.error("Unexpected email verification error:", error)
    return NextResponse.redirect(`${origin}/?error=auth_error&message=unexpected_error`)
  }
}
