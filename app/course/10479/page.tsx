import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, Star, Users, Clock, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-green-500 font-bold text-xl">
                inflearn
              </Link>
              <div className="flex items-center space-x-6">
                <span className="font-medium">강의</span>
                <span>로드맵</span>
                <span>멘토링</span>
                <span>커뮤니티</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>한국어</span>
              </div>
              <Button className="bg-green-500 hover:bg-green-600">로그인</Button>
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
            <span className="text-gray-900">게임 개발</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-blue-500 text-white mb-4">로드맵</Badge>
            <h1 className="text-4xl font-bold mb-4">[견고한 출시까지] 유니티 게임 개발 모바일 MMORPG 개발 로드맵</h1>
            <p className="text-lg mb-6 opacity-90">
              Unity 엔진을 활용하여 모바일 MMORPG 게임을 처음부터 출시까지 완성하는 전체 과정을 학습합니다.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="font-bold">4.9</span>
                <span className="opacity-80">(1,234)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>15,678명 수강</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>총 48시간</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3">
              로드맵 시작하기
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Course Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">로드맵 소개</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  이 로드맵은 Unity 게임 엔진을 사용하여 모바일 MMORPG 게임을 개발하는 전체 과정을 다룹니다. 게임
                  기획부터 프로그래밍, 아트 리소스 관리, 서버 연동, 최적화, 그리고 실제 스토어 출시까지의 모든 단계를
                  체계적으로 학습할 수 있습니다.
                </p>
                <p className="text-gray-700 mb-4">
                  초보자도 따라할 수 있도록 기초부터 차근차근 설명하며, 실무에서 바로 활용할 수 있는 실전 노하우와
                  팁들을 제공합니다.
                </p>
              </div>
            </div>

            {/* Learning Path */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">학습 경로</h2>
              <div className="space-y-4">
                {/* Step 1 */}
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">1단계: Unity 기초 및 C# 프로그래밍</h3>
                        <p className="text-gray-600 mb-3">
                          Unity 엔진의 기본 사용법과 C# 프로그래밍 언어를 학습합니다.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>8시간</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>24강의</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">2단계: 게임 시스템 설계 및 구현</h3>
                        <p className="text-gray-600 mb-3">
                          캐릭터 시스템, 인벤토리, 퀘스트 시스템 등 MMORPG의 핵심 시스템을 구현합니다.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>12시간</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>36강의</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">3단계: 네트워크 및 서버 연동</h3>
                        <p className="text-gray-600 mb-3">멀티플레이어 기능 구현과 서버와의 통신을 학습합니다.</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>15시간</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>42강의</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">4</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">4단계: 최적화 및 출시 준비</h3>
                        <p className="text-gray-600 mb-3">모바일 최적화, 성능 튜닝, 스토어 출시 과정을 학습합니다.</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>13시간</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>38강의</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Included Courses */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">포함된 강의</h2>
              <div className="grid gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">Unity</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-2">[견고한 출시까지] 유니티 게수업 모바일 MMORPG 개발 (M2)</h3>
                        <p className="text-gray-600 text-sm mb-2">Rookiss</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4.9 (76)</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>3,300+</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">₩1,208,733</span>
                          <Badge className="bg-blue-500 text-white">입문 활용</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">로드맵 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 강의 수</span>
                      <span className="font-medium">140강의</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 학습 시간</span>
                      <span className="font-medium">48시간</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">난이도</span>
                      <span className="font-medium">초급 ~ 고급</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수료증</span>
                      <span className="font-medium">제공</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">로드맵 시작하기</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">이런 분께 추천</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unity로 게임을 만들고 싶은 초보자</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>MMORPG 게임 개발에 관심있는 개발자</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>모바일 게임 출시를 목표로 하는 분</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>게임 개발 전반을 체계적으로 학습하고 싶은 분</span>
                    </li>
                  </ul>
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
