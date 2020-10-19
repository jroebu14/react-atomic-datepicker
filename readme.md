# react-atomic-datepicker [![Build Status](https://travis-ci.com/jroebu14/react-atomic-datepicker.svg?branch=master)](https://travis-ci.com/github/jroebu14/react-atomic-datepicker) [![codecov](https://codecov.io/gh/jroebu14/react-atomic-datepicker/badge.svg?branch=master)](https://codecov.io/gh/jroebu14/react-atomic-datepicker?branch=master)

## Install

```
$ npm install react-atomic-datepicker --save
```

## Usage

Basic example https://codesandbox.io/s/react-atomic-calendar-ymcml?file=/src/Datepicker.jsx

```jsx
import React from 'react'
import { useAtomicDatepicker } from 'react-atomic-datepicker'

const englishDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const englishMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const Datepicker = () => {
  const {
    months,
    currentYear,
    currentMonth,
    goToPreviousYear,
    goToNextYear,
    goToPreviousMonth,
    goToNextMonth,
    selectedDate,
  } = useAtomicDatepicker({ numMonths: 1 })
  const [{ weeks }] = months

  return (
    <div>
      <div>
        <button type="button" onClick={goToPreviousYear}>
          &lt;
        </button>
        &nbsp;Year&nbsp;
        <button type="button" onClick={goToNextYear}>
          &gt;
        </button>
      </div>

      <div>
        <button type="button" onClick={goToPreviousMonth}>
          &lt;
        </button>
        &nbsp;Month&nbsp;
        <button type="button" onClick={goToNextMonth}>
          &gt;
        </button>
      </div>

      <span>
        {englishMonths[currentMonth]} {currentYear}
      </span>

      <table>
        <thead>
          <tr>
            {englishDays.map(englishDay => (
              <th>{englishDay}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map(week => (
            <tr>
              {week.map(({ getDayProps, day, date }) => (
                <td
                  {...getDayProps()}
                  aria-label={date ? new Date(date).toDateString() : null}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <span>Selected date: {new Date(selectedDate).toDateString()}</span>
    </div>
  )
}
```
