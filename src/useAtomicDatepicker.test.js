import { renderHook, act } from '@testing-library/react-hooks'
import { useAtomicDatepicker } from '.'

const getDay = ({ day }) => day
const getDate = ({ date }) => {
  const readableDate = new Date(date).toDateString()
  return readableDate === 'Invalid Date' ? '' : readableDate
}
const getSelected = ({ day, getDayProps }) => ({
  day,
  isSelected: getDayProps().isSelected,
})
const getKeys = ({ getDayProps }) => getDayProps().key
const getA11yAttrs = ({ getDayProps }) => {
  const { tabIndex, role } = getDayProps()
  return { tabIndex, role }
}

beforeEach(jest.clearAllMocks)

describe('Initialising useAtomicDatepicker', () => {
  it('should use the current date when initialDate is not provided', () => {
    Date.now = jest.fn(() => 'Mon Oct 19 2020')
    const { result } = renderHook(() => useAtomicDatepicker())
    const { currentMonth, currentYear, months } = result.current
    const [{ weeks }] = months
    const selectedDate = weeks
      .find(week => week.find(({ getDayProps }) => getDayProps().isSelected))
      .map(getSelected)
      .find(({ isSelected }) => isSelected)

    expect(currentYear).toEqual(2020)
    expect(currentMonth).toEqual(9)
    expect(selectedDate).toEqual({ day: 19, isSelected: true })
  })

  it('should return the correct year and month', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2020)
    expect(currentMonth).toEqual(9)
  })
  it('should return the correct dates', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      [
        '',
        '',
        '',
        'Thu Oct 01 2020',
        'Fri Oct 02 2020',
        'Sat Oct 03 2020',
        'Sun Oct 04 2020',
      ],
      [
        'Mon Oct 05 2020',
        'Tue Oct 06 2020',
        'Wed Oct 07 2020',
        'Thu Oct 08 2020',
        'Fri Oct 09 2020',
        'Sat Oct 10 2020',
        'Sun Oct 11 2020',
      ],
      [
        'Mon Oct 12 2020',
        'Tue Oct 13 2020',
        'Wed Oct 14 2020',
        'Thu Oct 15 2020',
        'Fri Oct 16 2020',
        'Sat Oct 17 2020',
        'Sun Oct 18 2020',
      ],
      [
        'Mon Oct 19 2020',
        'Tue Oct 20 2020',
        'Wed Oct 21 2020',
        'Thu Oct 22 2020',
        'Fri Oct 23 2020',
        'Sat Oct 24 2020',
        'Sun Oct 25 2020',
      ],
      [
        'Mon Oct 26 2020',
        'Tue Oct 27 2020',
        'Wed Oct 28 2020',
        'Thu Oct 29 2020',
        'Fri Oct 30 2020',
        'Sat Oct 31 2020',
        '',
      ],
    ])
  })

  it('should return the correct days', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, undefined, undefined, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, undefined],
    ])
  })

  it('should return the correct isSelected props', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getSelected))).toEqual([
      [
        { day: undefined, isSelected: undefined },
        { day: undefined, isSelected: undefined },
        { day: undefined, isSelected: undefined },
        { day: 1, isSelected: false },
        { day: 2, isSelected: false },
        { day: 3, isSelected: false },
        { day: 4, isSelected: false },
      ],
      [
        { day: 5, isSelected: false },
        { day: 6, isSelected: false },
        { day: 7, isSelected: false },
        { day: 8, isSelected: false },
        { day: 9, isSelected: false },
        { day: 10, isSelected: false },
        { day: 11, isSelected: false },
      ],
      [
        { day: 12, isSelected: false },
        { day: 13, isSelected: false },
        { day: 14, isSelected: false },
        { day: 15, isSelected: false },
        { day: 16, isSelected: true },
        { day: 17, isSelected: false },
        { day: 18, isSelected: false },
      ],
      [
        { day: 19, isSelected: false },
        { day: 20, isSelected: false },
        { day: 21, isSelected: false },
        { day: 22, isSelected: false },
        { day: 23, isSelected: false },
        { day: 24, isSelected: false },
        { day: 25, isSelected: false },
      ],
      [
        { day: 26, isSelected: false },
        { day: 27, isSelected: false },
        { day: 28, isSelected: false },
        { day: 29, isSelected: false },
        { day: 30, isSelected: false },
        { day: 31, isSelected: false },
        { day: undefined, isSelected: undefined },
      ],
    ])
  })

  it('should return the correct key props', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getKeys))).toEqual([
      [
        0,
        1,
        2,
        '2020-09-30T23:00:00.000Z',
        '2020-10-01T23:00:00.000Z',
        '2020-10-02T23:00:00.000Z',
        '2020-10-03T23:00:00.000Z',
      ],
      [
        '2020-10-04T23:00:00.000Z',
        '2020-10-05T23:00:00.000Z',
        '2020-10-06T23:00:00.000Z',
        '2020-10-07T23:00:00.000Z',
        '2020-10-08T23:00:00.000Z',
        '2020-10-09T23:00:00.000Z',
        '2020-10-10T23:00:00.000Z',
      ],
      [
        '2020-10-11T23:00:00.000Z',
        '2020-10-12T23:00:00.000Z',
        '2020-10-13T23:00:00.000Z',
        '2020-10-14T23:00:00.000Z',
        '2020-10-15T23:00:00.000Z',
        '2020-10-16T23:00:00.000Z',
        '2020-10-17T23:00:00.000Z',
      ],
      [
        '2020-10-18T23:00:00.000Z',
        '2020-10-19T23:00:00.000Z',
        '2020-10-20T23:00:00.000Z',
        '2020-10-21T23:00:00.000Z',
        '2020-10-22T23:00:00.000Z',
        '2020-10-23T23:00:00.000Z',
        '2020-10-24T23:00:00.000Z',
      ],
      [
        '2020-10-26T00:00:00.000Z',
        '2020-10-27T00:00:00.000Z',
        '2020-10-28T00:00:00.000Z',
        '2020-10-29T00:00:00.000Z',
        '2020-10-30T00:00:00.000Z',
        '2020-10-31T00:00:00.000Z',
        6,
      ],
    ])
  })

  it('should return the correct a11y attr props', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getA11yAttrs))).toEqual([
      [
        { role: undefined, tabIndex: undefined },
        { role: undefined, tabIndex: undefined },
        { role: undefined, tabIndex: undefined },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
      ],
      [
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
      ],
      [
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
      ],
      [
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
      ],
      [
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: 'button', tabIndex: 0 },
        { role: undefined, tabIndex: undefined },
      ],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Increment month', () => {
  it('should return the correct year and month when month is incremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextMonth()
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2020)
    expect(currentMonth).toEqual(10)
  })

  it('should return the correct year and month when month is incremented multiple times', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    Array(30)
      .fill()
      .forEach(() => {
        act(() => {
          result.current.goToNextMonth()
        })
      })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2023)
    expect(currentMonth).toEqual(3)
  })

  it('should return the correct days when the month is incremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextMonth()
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, undefined, undefined, undefined, undefined, undefined, undefined],
    ])
  })

  it('should return the correct dates when month is incremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextMonth()
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      ['', '', '', '', '', '', 'Sun Nov 01 2020'],
      [
        'Mon Nov 02 2020',
        'Tue Nov 03 2020',
        'Wed Nov 04 2020',
        'Thu Nov 05 2020',
        'Fri Nov 06 2020',
        'Sat Nov 07 2020',
        'Sun Nov 08 2020',
      ],
      [
        'Mon Nov 09 2020',
        'Tue Nov 10 2020',
        'Wed Nov 11 2020',
        'Thu Nov 12 2020',
        'Fri Nov 13 2020',
        'Sat Nov 14 2020',
        'Sun Nov 15 2020',
      ],
      [
        'Mon Nov 16 2020',
        'Tue Nov 17 2020',
        'Wed Nov 18 2020',
        'Thu Nov 19 2020',
        'Fri Nov 20 2020',
        'Sat Nov 21 2020',
        'Sun Nov 22 2020',
      ],
      [
        'Mon Nov 23 2020',
        'Tue Nov 24 2020',
        'Wed Nov 25 2020',
        'Thu Nov 26 2020',
        'Fri Nov 27 2020',
        'Sat Nov 28 2020',
        'Sun Nov 29 2020',
      ],
      ['Mon Nov 30 2020', '', '', '', '', '', ''],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextMonth()
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Increment year', () => {
  it('should return the correct year and month when year is incremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextYear()
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2021)
    expect(currentMonth).toEqual(9)
  })

  it('should return the correct year and month when year is incremented multiple times', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    Array(30)
      .fill()
      .forEach(() => {
        act(() => {
          result.current.goToNextYear()
        })
      })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2050)
    expect(currentMonth).toEqual(9)
  })

  it('should return the correct dates when the year is incremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextYear()
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      ['', '', '', '', 'Fri Oct 01 2021', 'Sat Oct 02 2021', 'Sun Oct 03 2021'],
      [
        'Mon Oct 04 2021',
        'Tue Oct 05 2021',
        'Wed Oct 06 2021',
        'Thu Oct 07 2021',
        'Fri Oct 08 2021',
        'Sat Oct 09 2021',
        'Sun Oct 10 2021',
      ],
      [
        'Mon Oct 11 2021',
        'Tue Oct 12 2021',
        'Wed Oct 13 2021',
        'Thu Oct 14 2021',
        'Fri Oct 15 2021',
        'Sat Oct 16 2021',
        'Sun Oct 17 2021',
      ],
      [
        'Mon Oct 18 2021',
        'Tue Oct 19 2021',
        'Wed Oct 20 2021',
        'Thu Oct 21 2021',
        'Fri Oct 22 2021',
        'Sat Oct 23 2021',
        'Sun Oct 24 2021',
      ],
      [
        'Mon Oct 25 2021',
        'Tue Oct 26 2021',
        'Wed Oct 27 2021',
        'Thu Oct 28 2021',
        'Fri Oct 29 2021',
        'Sat Oct 30 2021',
        'Sun Oct 31 2021',
      ],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextYear()
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Decrement month', () => {
  it('should return the correct year and month when month is decremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToPreviousMonth()
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2020)
    expect(currentMonth).toEqual(8)
  })

  it('should return the correct year and month when month is decremented multiple times', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    Array(30)
      .fill()
      .forEach(() => {
        act(() => {
          result.current.goToPreviousMonth()
        })
      })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2018)
    expect(currentMonth).toEqual(3)
  })

  it('should return the correct days when the month is decremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToPreviousMonth()
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, undefined, undefined, undefined, undefined],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToNextMonth()
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Decrement year', () => {
  it('should return the correct year and month when year is decremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToPreviousYear()
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2019)
    expect(currentMonth).toEqual(9)
  })

  it('should return the correct year and month when year is decremented multiple times', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    Array(30)
      .fill()
      .forEach(() => {
        act(() => {
          result.current.goToPreviousYear()
        })
      })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(1990)
    expect(currentMonth).toEqual(9)
  })

  it('should return the correct days when the year is decremented', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToPreviousMonth()
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, undefined, undefined, undefined, undefined],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.goToPreviousYear()
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Selecting date', () => {
  it('should return the correct selected date when day is clicked on', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const [{ weeks }] = result.current.months

    const { onClick } = weeks[0].find(({ day }) => day === 4).getDayProps()

    act(() => {
      onClick()
    })

    const { selectedDate } = result.current

    expect(selectedDate).toEqual('2020-10-03T23:00:00.000Z')
  })

  it('should return the correct selected date when enter key is pressed on day', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const [{ weeks }] = result.current.months
    const { onKeyDown } = weeks[3].find(({ day }) => day === 25).getDayProps()

    act(() => {
      onKeyDown({ key: 'Enter' })
    })

    const { selectedDate } = result.current

    expect(selectedDate).toEqual('2020-10-24T23:00:00.000Z')
  })

  it('should not change date when any other key but Enter is pressed', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )
    const [{ weeks }] = result.current.months
    const { onKeyDown } = weeks[3].find(({ day }) => day === 25).getDayProps()

    act(() => {
      onKeyDown({ key: 'Down' })
    })

    const { selectedDate } = result.current

    expect(selectedDate).toEqual('2020-10-15T23:00:00.000Z')
  })
})

describe('Changing month', () => {
  it('should return the month and year', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setMonth(2)
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2020)
    expect(currentMonth).toEqual(2)
  })

  it('should return the correct days', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setMonth(2)
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, 31, undefined, undefined, undefined, undefined, undefined],
    ])
  })

  it('should return the correct dates', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setMonth(2)
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      ['', '', '', '', '', '', 'Sun Mar 01 2020'],
      [
        'Mon Mar 02 2020',
        'Tue Mar 03 2020',
        'Wed Mar 04 2020',
        'Thu Mar 05 2020',
        'Fri Mar 06 2020',
        'Sat Mar 07 2020',
        'Sun Mar 08 2020',
      ],
      [
        'Mon Mar 09 2020',
        'Tue Mar 10 2020',
        'Wed Mar 11 2020',
        'Thu Mar 12 2020',
        'Fri Mar 13 2020',
        'Sat Mar 14 2020',
        'Sun Mar 15 2020',
      ],
      [
        'Mon Mar 16 2020',
        'Tue Mar 17 2020',
        'Wed Mar 18 2020',
        'Thu Mar 19 2020',
        'Fri Mar 20 2020',
        'Sat Mar 21 2020',
        'Sun Mar 22 2020',
      ],
      [
        'Mon Mar 23 2020',
        'Tue Mar 24 2020',
        'Wed Mar 25 2020',
        'Thu Mar 26 2020',
        'Fri Mar 27 2020',
        'Sat Mar 28 2020',
        'Sun Mar 29 2020',
      ],
      ['Mon Mar 30 2020', 'Tue Mar 31 2020', '', '', '', '', ''],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setMonth(2)
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Changing year', () => {
  it('should return the correct month and year', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setYear(1987)
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(1987)
    expect(currentMonth).toEqual(9)
  })

  it('should return the correct days', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setYear(1987)
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [undefined, undefined, undefined, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, undefined],
    ])
  })

  it('should return the correct dates', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setYear(1987)
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      [
        '',
        '',
        '',
        'Thu Oct 01 1987',
        'Fri Oct 02 1987',
        'Sat Oct 03 1987',
        'Sun Oct 04 1987',
      ],
      [
        'Mon Oct 05 1987',
        'Tue Oct 06 1987',
        'Wed Oct 07 1987',
        'Thu Oct 08 1987',
        'Fri Oct 09 1987',
        'Sat Oct 10 1987',
        'Sun Oct 11 1987',
      ],
      [
        'Mon Oct 12 1987',
        'Tue Oct 13 1987',
        'Wed Oct 14 1987',
        'Thu Oct 15 1987',
        'Fri Oct 16 1987',
        'Sat Oct 17 1987',
        'Sun Oct 18 1987',
      ],
      [
        'Mon Oct 19 1987',
        'Tue Oct 20 1987',
        'Wed Oct 21 1987',
        'Thu Oct 22 1987',
        'Fri Oct 23 1987',
        'Sat Oct 24 1987',
        'Sun Oct 25 1987',
      ],
      [
        'Mon Oct 26 1987',
        'Tue Oct 27 1987',
        'Wed Oct 28 1987',
        'Thu Oct 29 1987',
        'Fri Oct 30 1987',
        'Sat Oct 31 1987',
        '',
      ],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setYear(1987)
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Setting selected date', () => {
  it('should return the correct month and year', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setSelectedDate('2050-08-28')
    })

    const { currentYear, currentMonth } = result.current

    expect(currentYear).toEqual(2050)
    expect(currentMonth).toEqual(7)
  })

  it('should return the correct days', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setSelectedDate('2050-08-28')
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDay))).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, undefined, undefined, undefined, undefined],
    ])
  })

  it('should return the correct dates', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setSelectedDate('2050-08-28')
    })

    const [{ weeks }] = result.current.months

    expect(weeks.map(week => week.map(getDate))).toEqual([
      [
        'Mon Aug 01 2050',
        'Tue Aug 02 2050',
        'Wed Aug 03 2050',
        'Thu Aug 04 2050',
        'Fri Aug 05 2050',
        'Sat Aug 06 2050',
        'Sun Aug 07 2050',
      ],
      [
        'Mon Aug 08 2050',
        'Tue Aug 09 2050',
        'Wed Aug 10 2050',
        'Thu Aug 11 2050',
        'Fri Aug 12 2050',
        'Sat Aug 13 2050',
        'Sun Aug 14 2050',
      ],
      [
        'Mon Aug 15 2050',
        'Tue Aug 16 2050',
        'Wed Aug 17 2050',
        'Thu Aug 18 2050',
        'Fri Aug 19 2050',
        'Sat Aug 20 2050',
        'Sun Aug 21 2050',
      ],
      [
        'Mon Aug 22 2050',
        'Tue Aug 23 2050',
        'Wed Aug 24 2050',
        'Thu Aug 25 2050',
        'Fri Aug 26 2050',
        'Sat Aug 27 2050',
        'Sun Aug 28 2050',
      ],
      ['Mon Aug 29 2050', 'Tue Aug 30 2050', 'Wed Aug 31 2050', '', '', '', ''],
    ])
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020' }),
    )

    act(() => {
      result.current.setSelectedDate('2050-08-28')
    })

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})

describe('Multiple months', () => {
  it('should return the correct month and year', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020', numMonths: 2 }),
    )
    const [
      { currentMonth: month1, currentYear: year1 },
      { currentMonth: month2, currentYear: year2 },
    ] = result.current.months

    expect(month1).toEqual(9)
    expect(month2).toEqual(10)
    expect(year1).toEqual(2020)
    expect(year2).toEqual(2020)
  })

  it('should return the correct data structure', () => {
    const { result } = renderHook(() =>
      useAtomicDatepicker({ initialDate: 'Fri Oct 16 2020', numMonths: 2 }),
    )

    expect(JSON.stringify(result.current, null, 2)).toMatchSnapshot()
  })
})
