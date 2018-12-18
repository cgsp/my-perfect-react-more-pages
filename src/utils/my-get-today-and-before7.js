export const myGetTodayDateAndBefore7 = () => {
  const today = new Date()
  const todayStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  let before7 = new Date(today)
  before7.setDate(today.getDate() - 6)
  const before7Str = before7.getFullYear() + '-' + (before7.getMonth() + 1) + '-' + before7.getDate()

  return {
    todayStr,
    before7Str
  }
}
