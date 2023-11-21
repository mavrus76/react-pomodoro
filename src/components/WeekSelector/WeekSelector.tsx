import React, { useEffect, useState } from "react"
import styles from "./weekselector.module.css"
import "react-day-picker/dist/style.css"
import { ru } from "date-fns/locale"
import { DayPicker } from "react-day-picker"
import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  getWeek,
} from "date-fns"
import { Helmet, HelmetProvider } from "react-helmet-async"
import classNames from "classnames"
import { useActions } from "../../hooks/useActions"
import { useConstants } from "../../hooks/useConstants"

const getWeekDays = (weekStart: Date) => {
  const days: Date[] = [weekStart]
  for (let i = 1; i < 7; i += 1) {
    days.push(addDays(weekStart, i))
  }
  return days
}

const getWeekRange = (date: Date) => {
  return {
    from: startOfWeek(date, { locale: ru }),
    to: endOfWeek(date, { locale: ru }),
  }
}

const getWeekNumber = (date: Date) => getWeek(date, { locale: ru }) - 1

export const WeekSelector: React.FC = () => {
  const { selectedWeek, selectedDates, hoverRange } = useConstants()
  const { setSelectedDates, setHoverRange, setSelectedWeek } = useActions()
  const [weekNumber, setWeekNumber] = useState<number>(selectedWeek)

  const formattedRange = () => {
    if (selectedDates.length !== 7) return "Выберите неделю."
    const fromDate = selectedDates[0]
    const toDate = selectedDates[6]
    const fromFormatted = format(fromDate, "d MMMM yyyy", { locale: ru })
    const toFormatted = format(
      toDate,
      isSameMonth(fromDate, toDate) ? "d MMMM yyyy" : "d MMMM yyyy",
      { locale: ru },
    )
    return `${fromFormatted} - ${toFormatted}`
  }

  const footer =
    weekNumber !== undefined ? formattedRange() : "Выберите неделю."

  const handleDayChange = (date: Date) => {
    setSelectedDates(getWeekDays(getWeekRange(date).from))
    setSelectedWeek(getWeekNumber(date))
  }

  const handleDayEnter = (date: Date) => {
    setHoverRange(getWeekRange(date))
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (weekNumber: number, dates: Date[]) => {
    setWeekNumber(weekNumber)
    setSelectedWeek(weekNumber)
    setSelectedDates(dates)
  }

  const daysAreSelected = selectedDates.length > 0

  const modifiers = {
    hoverRange: hoverRange ? [hoverRange.from, hoverRange.to] : [],
    selectedRange: daysAreSelected ? [selectedDates[0], selectedDates[6]] : [],
    hoverRangeStart: hoverRange ? [hoverRange.from] : [],
    hoverRangeEnd: hoverRange ? [hoverRange.to] : [],
    selectedRangeStart: daysAreSelected ? [selectedDates[0]] : [],
    selectedRangeEnd: daysAreSelected ? [selectedDates[6]] : [],
  }

  useEffect(() => {
    const currentDate = new Date()
    setSelectedWeek(getWeekNumber(currentDate))
    setSelectedDates(getWeekDays(getWeekRange(currentDate).from))
  }, [])

  return (
    <HelmetProvider>
      <section className={classNames(styles.wrapper, "SelectedWeek")}>
        <DayPicker
          selected={selectedDates}
          ISOWeek
          showWeekNumber
          showOutsideDays
          locale={ru}
          modifiers={modifiers}
          onDayClick={handleDayChange}
          onDayMouseEnter={handleDayEnter}
          onDayMouseLeave={handleDayLeave}
          onWeekNumberClick={handleWeekClick}
          footer={footer}
        />

        <Helmet>
          <style>{`
            .SelectedWeek .rdp-month {
              border-collapse: separate;
            }
            .SelectedWeek .rdp-weeknumber {
              outline: none;
            }
            .SelectedWeek .rdp-day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeek .rdp-day_selected {
              background-color: #FFEB3B !important;
            }
            .SelectedWeek .rdp-day_selected:not(.rdp-day_outside).rdp-day_selected,
            .SelectedWeek .rdp-day_selected:hover:not(.rdp-day_outside).rdp-day_selected {
              border-radius: 0 !important;
              color: black !important;
            }
            .SelectedWeek .rdp-day_today{
              color: var(--red) !important;
            }
            .SelectedWeek .rdp-tfoot > tr > td {
              padding-top: 16px;
              color: var(--blue) !important;
            }
            .SelectedWeek .rdp-caption_label {
              text-transform: capitalize;
            }
          `}</style>
        </Helmet>
      </section>
    </HelmetProvider>
  )
}
