const DAYS_IN_WEEK = 7

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  Novermber: 10,
  December: 11
}

export function areEqual(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function getDaysInMonth(date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = DAYS_IN_MONTH[month]

  return isLeapYear(year) && month === Month.February
    ? daysInMonth + 1
    : daysInMonth
}

export function isLeapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

export function getDayOfWeek(date) {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1
}

export function getMonthData(year, month) {
  const result = []
  const date = new Date(year, month)

  const daysInMonth = getDaysInMonth(date)
  const monthStartsOn = getDayOfWeek(date)
  const weeks = (daysInMonth + monthStartsOn) / DAYS_IN_WEEK

  let day = 1;

  for (let i = 0; i < weeks; i++) {
    result[i] = []

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined
      } else {
        result[i][j] = new Date(year, month, day++)
      }

    }
  }

  return result
}