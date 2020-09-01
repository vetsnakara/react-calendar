import React from 'react'
import classnames from 'classnames'

import * as calendar from './utils'

import './styles.css'

export class Calendar extends React.Component {
  static defaultProps = {
    years: [
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020
    ],
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    weekDayNames: [
      "Пн",
      "Вн",
      "Ср",
      "Чт",
      "Пт",
      "Сб",
      "Вс"
    ],
    date: new Date(),
    onChange: () => { }
  }

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null
  }

  get year() {
    return this.state.date.getFullYear()
  }

  get month() {
    return this.state.date.getMonth()
  }

  get day() {
    return this.state.date.getDate()
  }

  handlePrevMonthButtonClick = () => {
    this.setState(({ date }) => ({
      date: new Date(
        this.year,
        this.month - 1
      )
    }))
  }

  handleNextMonthButtonClick = () => {
    this.setState(({ date }) => ({
      date: new Date(
        this.year,
        this.month + 1
      )
    }))
  }

  handleSelectChange = () => {
    const month = this.monthSelect.value
    const year = this.yearSelect.value
    this.setState({ date: new Date(year, month) })
  }

  handleDayClick = date => {
    this.setState({ selectedDate: date })
    this.props.onChange(date)
  }

  render() {
    const { currentDate, selectedDate } = this.state
    const { years, monthNames, weekDayNames } = this.props
    const monthData = calendar.getMonthData(this.year, this.month)

    return (
      <div className='calendar'>
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>
            {'<'}
          </button>
          <select
            value={this.month}
            ref={el => this.monthSelect = el}
            onChange={this.handleSelectChange}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>{name}</option>
            ))}
          </select>
          <select
            value={this.year}
            ref={el => this.yearSelect = el}
            onChange={this.handleSelectChange}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDayNames.map(name => (
                <td key={name}>{name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className='week'>
                {week.map((date, index) => date
                  ? (
                    <td
                      key={index}
                      onClick={() => this.handleDayClick(date)}
                      className={classnames('day', {
                        'today': calendar.areEqual(date, currentDate),
                        'selected': calendar.areEqual(date, selectedDate),
                      })}
                    >
                      {date.getDate()}
                    </td>
                  )
                  : <td key={index} className="day" />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}