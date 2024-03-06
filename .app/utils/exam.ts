export function checkExamSession(slug: string) {
  const status = localStorage.getItem(`exam-${slug}`)

  if (status) {
    return true
  } else {
    return false
  }
}
