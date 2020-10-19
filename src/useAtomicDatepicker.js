import React from 'react'

const numWeekDays = 7

const getNumDaysInMonth = (month, year) =>
  new Date(year, month + 1, 0).getDate()

const getIndex = (_, index) => index

const indexToNumber = index => index + 1

const dateToDayOfWeek = date => day => {
  const newDate = new Date(date)
  newDate.setDate(day)

  return newDate.getDay()
}

const removeTime = date => {
  const newDate = new Date(date)

  return new Date(newDate.toDateString())
}

const getEmptyWeek = () =>
  Array(numWeekDays)
    .fill()
    .map(getIndex)
    .map(index => ({
      getDayProps: () => ({ key: index }),
    }))

const setMonth = (date, month) => {
  const newDate = new Date(date)
  newDate.setMonth(month)

  return newDate
}

const setYear = (date, year) => {
  const newDate = new Date(date)
  newDate.setFullYear(year)

  return newDate
}

const isSelectedDate = (date, selectedDate) =>
  date.getTime() === selectedDate.getTime()

const setDay = (date, day) => {
  const newDate = new Date(date)
  newDate.setDate(day)

  return newDate
}

const getDayItem = ({ day, currentDate, selectedDate, setSelectedDate }) => {
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const isSelected = isSelectedDate(
    new Date(currentYear, currentMonth, day),
    selectedDate,
  )
  const IsoDate = new Date(currentYear, currentMonth, day).toISOString()

  return {
    day,
    date: IsoDate,
    getDayProps: () => ({
      isSelected,
      tabIndex: 0,
      role: 'button',
      key: IsoDate,
      onKeyDown: ({ key }) => {
        if (key === 'Enter') {
          setSelectedDate(setDay(currentDate, day))
        }
      },
      onClick: () => {
        setSelectedDate(setDay(currentDate, day))
      },
    }),
  }
}

const getWeeks = ({ currentDate, selectedDate, setSelectedDate }) => {
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const numDaysInMonth = getNumDaysInMonth(currentMonth, currentYear)
  const weeks = Array(numDaysInMonth)
    .fill()
    .map(getIndex)
    .map(indexToNumber)
    .map(dateToDayOfWeek(currentDate))
    .reduce(
      (_acc, dayOfWeek, index) => {
        const acc = _acc.map(item => [...item])
        const isStartOfWeek = dayOfWeek === 1
        const isEndOfWeek = dayOfWeek === 0
        const day = indexToNumber(index)
        const item = getDayItem({
          day,
          currentDate,
          selectedDate,
          setSelectedDate,
        })

        if (isStartOfWeek && index) {
          acc.push(getEmptyWeek())
        }
        if (isEndOfWeek) {
          acc[acc.length - 1][numWeekDays - 1] = item
        } else {
          acc[acc.length - 1][dayOfWeek - 1] = item
        }

        return acc
      },
      [getEmptyWeek()],
    )

  return {
    currentMonth,
    currentYear,
    weeks,
  }
}

export const useAtomicDatepicker = ({
  initialDate = Date.now(),
  numMonths = 1,
} = {}) => {
  const [currentDate, setCurrentDate] = React.useState(removeTime(initialDate))
  const [selectedDate, setSelectedDate] = React.useState(
    removeTime(initialDate),
  )
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const nextMonth = setMonth(currentDate, currentMonth + 1)
  const previousMonth = setMonth(currentDate, currentMonth - 1)
  const nextYear = setYear(currentDate, currentYear + 1)
  const previousYear = setYear(currentDate, currentYear - 1)
  const goToNextMonth = () => setCurrentDate(nextMonth)
  const goToPreviousMonth = () => setCurrentDate(previousMonth)
  const goToNextYear = () => setCurrentDate(nextYear)
  const goToPreviousYear = () => setCurrentDate(previousYear)
  const months = Array(numMonths)
    .fill()
    .map(getIndex)
    .map(increment =>
      getWeeks({
        currentDate: setMonth(currentDate, currentMonth + increment),
        selectedDate,
        setSelectedDate,
      }),
    )

  return {
    months,
    currentMonth,
    currentYear,
    goToNextMonth,
    goToPreviousMonth,
    goToNextYear,
    goToPreviousYear,
    setMonth: month => setCurrentDate(setMonth(currentDate, month)),
    setYear: year => setCurrentDate(setYear(currentDate, year)),
    setSelectedDate: date => {
      const newDate = new Date(date)
      setCurrentDate(newDate)
      setSelectedDate(newDate)
    },
    selectedDate: selectedDate.toISOString(),
  }
}

export default useAtomicDatepicker
