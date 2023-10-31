import { DateRangeOptions, Inclusivity, IsBetweenDuration, IsSameOrAfterDuration, IsSameOrBeforeDuration, ResetToDuration } from '../../@types'
import {
  addDays,
  addHours, addYears, differenceInDays,
  differenceInHours, differenceInSeconds, differenceInYears, eachDayOfInterval, endOfMonth, format as formatLocal,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isValid,
  parse,
  set,
  startOfMonth
} from 'date-fns'
import moment from 'moment'
import { addCeros } from '../misc/string'

// export type DateUtilsFormat = 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss' | 'yyyy-MM-dd 12:00:00' | 'yyyy-MM-dd 00:00:00'
export type DateUtilsFormat = 'date' | 'timestamp' | 'timestamp12' | 'timestamp0'

export type timestamp = `${number}${number}${number}${number}-${number}${number}-${number}${number} ${number}${number}:${number}${number}:${number}${number}`
// This class exists to prevent issues if date-fns is removed
export class DateUtils {
  static addHours = addHours
  static addDaysLocal = addDays
  static addYears = addYears
  static differenceInHours = differenceInHours
  static differenceInDays = differenceInDays
  static differenceInSeconds = differenceInSeconds
  static differenceInYears = differenceInYears
  static endOfMonth = endOfMonth

  static formatLocal = formatLocal
  // Test
  static isAfter = isAfter
  static isBefore = isBefore
  static isEqual = isEqual
  static isSameDay = isSameDay
  static isValid = isValid
  static parse = parse
  static startOfMonth = startOfMonth

  static addDays(date: Date, days = 1) {
    const dateReturn = new Date(date)
    const desiredDay = dateReturn.getUTCDate() + days
    dateReturn.setUTCDate(desiredDay)
    return dateReturn
  }

  static addMinutes(date: Date, minutes = 1) {
    const dateReturn = new Date(date)
    const desiredMinutes = dateReturn.getUTCMinutes() + minutes
    dateReturn.setUTCMinutes(desiredMinutes)
    return dateReturn
  }

  // Anulado cambio de hora
  static addMonths(date: Date, months = 1) {
    const dateReturn = new Date(date)
    const desiredMonth = dateReturn.getUTCMonth() + months
    dateReturn.setUTCMonth(desiredMonth)
    return dateReturn
  }

  static daysAfter(days = 1) {
    return DateUtils.resetTo(
      DateUtils.addDays(DateUtils.nowUtc(), days),
      // DateUtils.addDays(new Date(), days),
      'days',
    )
  }

  static daysAgo(days = 1) {
    return DateUtils.resetTo(
      DateUtils.addDays(DateUtils.nowUtc(), -days),
      // DateUtils.addDays(new Date(), -days),
      'days',
    )
  }

  // Test
  static dateValidator = (date, spaceSubtypeHour = 12) => {

    if (/^\d{4}-\d{2}-\d{2}/.test(date) && moment(date, 'YYYY-MM-DD').isValid()) return moment(date, 'YYYY-MM-DD HH:00:00')

    return moment(date, 'YYYY-MM-DD').hours(spaceSubtypeHour)
    // return moment(date, 'DD-MM-YYYY').hours(spaceSubtypeHour)

    // if (/^\d{4}-\d{2}-\d{2}/.test(date) && moment(date, 'YYYY-MM-DD').isValid()) return moment(date, 'YYYY-MM-DD HH:00:00')
    // return moment(date, 'DD-MM-YYYY').hours(12)
  }

  /**
   * Convierte los valores UTC en string
   * @param date 
   * @param format 
   * @returns 
   */
  static format(date: Date, format: string, locale?) {
    if (!date) return ''

    let matches
    if (matches = /^yyyy\-MM\-dd (\d{2}:\d{2}:\d{2})$/i.exec(format)) {
      return DateUtils.utcToTimestamp(date).split(' ')[0] + ' ' + matches[1]
    } else if (/^yyyy\-MM\-dd\s?HH:mm:ss$/i.test(format)) {
      return DateUtils.utcToTimestamp(date)
    } else if (/^yyyy\-MM\-dd$/i.test(format)) {
      return DateUtils.utcToTimestamp(date).split(' ')[0]
    }

    if (locale) {
      return formatLocal(date, format, locale)
    }
    return formatLocal(date, format)
    // return formatLocal(date, format, { locale: es })
  }


  // Test
  static getDateRange(fromP: Date, toP: Date, options?: DateRangeOptions): Date[] {

    if (!DateUtils.isValid(fromP) || !DateUtils.isValid(toP)) throw new Error('$date.getDateRange: Invalid Date') // From: null - devuelve fecha desde 1970

    let from = new Date(fromP), to = new Date(toP)

    const today = DateUtils.nowUtc()
    const maximumDate = DateUtils.getMaximumDate()

    if (options?.limitFrom && DateUtils.isBefore(from, today)) {
      from = today
    }

    if (options?.limitTo && DateUtils.isAfter(to, maximumDate)) {
      to = maximumDate
    }

    const inclusivity = options?.inclusivity || '[)'

    if (inclusivity[0] === '(') {
      from = DateUtils.addDays(from, 1)
    }

    if (inclusivity[1] === ')') {
      to = DateUtils.addDays(to, -1)
    }

    const dateArray: Date[] = []
    while (from <= to) {
      dateArray.push(new Date(from))
      from = DateUtils.addDays(from, 1)
    }
    return dateArray;

    // Erroneo: Interpreta los dates como hora local y los devuelve como UTC
    // return eachDayOfInterval({ start: from, end: to })
  }


  public static getLocalTime(value: Date): string {
    return value.getFullYear() + '-' + addCeros(value.getMonth() + 1) + '-' + addCeros(value.getDate()) + ' ' + addCeros(value.getHours()) + ':' + addCeros(value.getMinutes()) + ':' + addCeros(value.getSeconds())
  }

  //Test
  static getMaximumDate(): Date {
    return DateUtils.addMonths(DateUtils.nowUtc(), Number(<string>process.env.MONTHS_FORWARD) || 24)
    // return DateUtils.addMonths(new Date(), Number(<string>process.env.MONTHS_FORWARD) || 24)
  }

  // Test
  static getWeekDay(date: Date): "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su" {
    return <"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">DateUtils.format(date, 'iiiiii')
  }

  // Test
  static keyable(date: Date, hours = false) {
    if (hours) {
      return date.toISOString()
    }

    return DateUtils.format(date, 'yyyy-MM-dd')
  }

  // Test
  /**
   * @param duration - 'days' | 'hours'
   * @param inclusivity - (|): excluye / [|]: incluye
   * @returns true | false
   */
  static isBetween(date: Date, dateLeft: Date, dateRight: Date, duration: IsBetweenDuration = 'hours', inclusivity: Inclusivity = '()'): boolean {
    if (!['days', 'hours'].includes(duration)) {
      throw new Error('$date.isBetween: Unsuported duration, must be one of [days, hours]')
    }

    if (!['()', '[)', '(]', '[]'].includes(inclusivity)) {
      throw new Error('$date.isBetween: Unsuported inclusivity, must be one of [(), [), (], []]')
    }

    date = DateUtils.resetTo(date, duration)
    dateLeft = DateUtils.resetTo(dateLeft, duration)
    dateRight = DateUtils.resetTo(dateRight, duration)

    const [leftInclusivity, rightInclusivity] = inclusivity

    const inLeft = leftInclusivity === '[' ? DateUtils.isSameOrAfter(date, dateLeft, duration) : DateUtils.isAfter(date, dateLeft)

    const inRight = rightInclusivity === ']' ? DateUtils.isSameOrBefore(date, dateRight, duration) : DateUtils.isBefore(date, dateRight)

    return inLeft && inRight
  }

  static isSameOrAfter(dateLeft: Date, dateRight: Date, duration?: IsSameOrAfterDuration) {
    if (!duration) {
      return DateUtils.isEqual(dateLeft, dateRight) || isAfter(dateLeft, dateRight)
    }

    if (!['years', 'days', 'hours'].includes(duration)) {
      throw new Error('$date.isSameOrAfter: Unsuported duration, must be one of [years, days, hours]')
    }

    if (duration === 'days') {
      return DateUtils.differenceInDays(dateLeft, dateRight) >= 0
    }

    if (duration === 'hours') {
      return DateUtils.differenceInHours(dateLeft, dateRight) >= 0
    }

    return DateUtils.differenceInYears(dateLeft, dateRight) >= 0
  }

  // Sin test por antonimia con isSameOrAfter
  static isSameOrBefore(dateLeft: Date, dateRight: Date, duration?: IsSameOrBeforeDuration) {
    if (!duration) {
      return DateUtils.isEqual(dateLeft, dateRight) || isBefore(dateLeft, dateRight)
    }

    if (!['years', 'days', 'hours'].includes(duration)) {
      throw new Error('$date.isSameOrBefore: Unsuported duration, must be one of [years, days, hours]')
    }

    if (duration === 'days') {
      return DateUtils.differenceInDays(dateLeft, dateRight) <= 0
    }

    if (duration === 'hours') {
      return DateUtils.differenceInHours(dateLeft, dateRight) <= 0
    }

    return DateUtils.differenceInYears(dateLeft, dateRight) <= 0
  }

  static nowUtc(): Date {
    const fecha = new Date();
    return new Date(DateUtils.getLocalTime(fecha).replace(' ', 'T') + 'Z')
  }

  static todayHourUtc(hour = 12): Date {
    // const fecha = new Date();
    return new Date(DateUtils.keyable(DateUtils.nowUtc()) + 'T' + hour.toString() + ':00:00Z')
  }

  // Test
  static resetTo(date: Date, duration?: ResetToDuration) {
    if (!['days', 'hours', 'minutes', 'seconds'].includes(<string>duration)) {
      throw new Error('resetTo: Unsuported duration, must be one of [days, hours, minutes, seconds]')
    }

    date = set(date, { milliseconds: 0 })
    if (duration === 'seconds') return date

    date = set(date, { seconds: 0 })
    if (duration === 'minutes') return date

    date = set(date, { minutes: 0 })
    if (duration === 'hours') return date

    //date = set(date, { hours: 0 });
    date.setUTCHours(0);
    return date
  }

  static resetToUTC(date: Date, format = 'yyyy-MM-dd'): Date {

    if (!date) return <any>null
    const fecha: string = DateUtils.format(date, format)

    return new Date(/yyyy\-MM\-dd$/.test(format) ? fecha : fecha.replace(' ', 'T') + 'Z')
  }

  // Test - Sin test KO
  static timestampToUtc(string: timestamp | string): Date {
    // static timestampToUtc(timestamp: string): Date {
    // timestamp = string.replace(' ', 'T') + 'Z'
    return new Date(string.replace(' ', 'T') + 'Z')
  }

  // Test
  static today() {
    return DateUtils.resetTo(
      //new Date(),
      DateUtils.nowUtc(),
      'days'
    )
  }

  // Test
  static tomorrow() {
    return DateUtils.resetTo(
      DateUtils.addDays(new Date(), 1),
      'days',
    )
  }

  public static utcToTimestamp(value: Date): string {
    return value.getUTCFullYear() + '-' + addCeros(value.getUTCMonth() + 1) + '-' + addCeros(value.getUTCDate()) +
      ' ' + addCeros(value.getUTCHours()) + ':' + addCeros(value.getMinutes()) + ':' + addCeros(value.getSeconds())
  }

  // Test
  static validateFromAndTo(from: Date, to: Date, rearrange = false) {
    if (!isAfter(from, to)) {
      return { from, to }
    }

    if (!rearrange) {
      throw new Error('validateFromAndTo: "from" date cannot be after "to" date. Consider using rearrange option.')
    }

    return {
      from: to,
      to: from,
    }
  }

  // Test
  static yesterday() {
    return DateUtils.resetTo(DateUtils.addDays(new Date(), -1), 'days')
  }
}

