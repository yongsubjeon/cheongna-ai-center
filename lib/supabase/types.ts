export type Database = {
  public: {
    Tables: {
      lectures: {
        Row: {
          id: string
          title: string
          video_url: string
        }
        Insert: {
          id?: string
          title: string
          video_url: string
        }
        Update: {
          id?: string
          title?: string
          video_url?: string
        }
      }
      lecture_progress: {
        Row: {
          user_id: string
          lecture_id: string
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          user_id: string
          lecture_id: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          user_id?: string
          lecture_id?: string
          completed?: boolean
          completed_at?: string | null
        }
      }
    }
  }
}

export type Lecture = Database["public"]["Tables"]["lectures"]["Row"]
export type LectureProgress = Database["public"]["Tables"]["lecture_progress"]["Row"]
