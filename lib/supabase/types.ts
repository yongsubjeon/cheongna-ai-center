export type Database = {
  public: {
    Tables: {
      lectures: {
        Row: {
          id: string
          title: string
          video_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          video_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          video_url?: string
          created_at?: string
        }
      }
      lecture_progress: {
        Row: {
          user_id: string
          lecture_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          lecture_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          lecture_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      lecture_progress_with_user: {
        Row: {
          user_id: string
          lecture_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
          lecture_title: string
          video_url: string
          email: string
          user_created_at: string
          last_sign_in_at: string | null
        }
      }
      user_progress_summary: {
        Row: {
          user_id: string
          email: string
          user_created_at: string
          last_sign_in_at: string | null
          total_lectures_started: number
          completed_lectures: number
          incomplete_lectures: number
          completion_percentage: number
        }
      }
      lecture_progress_summary: {
        Row: {
          lecture_id: string
          lecture_title: string
          video_url: string
          lecture_created_at: string
          total_students: number
          completed_students: number
          incomplete_students: number
          completion_rate: number
        }
      }
    }
  }
}

export type Lecture = Database["public"]["Tables"]["lectures"]["Row"]
export type LectureProgress = Database["public"]["Tables"]["lecture_progress"]["Row"]
export type LectureProgressWithUser = Database["public"]["Views"]["lecture_progress_with_user"]["Row"]
export type UserProgressSummary = Database["public"]["Views"]["user_progress_summary"]["Row"]
export type LectureProgressSummary = Database["public"]["Views"]["lecture_progress_summary"]["Row"]
