interface user {
  active_feature: string[]
  classroom: string
  classroom_id: string
  gender: 'male' | 'female' | 'laki-laki' | 'perempuan'
  homeroom_teacher: string
  id: string
  max_point: number
  name: string
  email : string
  nis: string
  nisn: string
  photo: string
  point: number
  religion: 'islam' | 'kristen' | 'khatolik' | 'hindu' | 'budha' | 'konghuchu'
  school: string
  school_id: string
}

export function useUserData() {
  //@ts-ignore
  const user: user = JSON.parse(localStorage.getItem('user'))
  return user
}
