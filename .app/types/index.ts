export interface exam {
  id: string
  start_at: string
  end_at: string
  lesson: string
  name: string
  time: number
  total_essay: number
  total_multiple_choice: number
  start_in: string
  slug: string
  deadline: string
  cheating_detector: boolean
  last_submit: boolean
  started: string
  finished: string
}

export interface dailyExam {
  id: string
  slug: string
  title: string
  lesson: string
  total_essay: number
  total_multiple_choice: number
  start_at: string
  end_at: string
  start_in: string
  finished: string
  started: string
  time: string
  deadline: string
}

export interface question {
  lesson: string
  level: string
  employee: string
  school_year: string
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  option5: string
  question_number: string
}
