export const addCeros = (num: string | number, length = 2) => {

  num = num.toString()

  while (num.length < length) {
    num = 0 + num
  }

  return num
}

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return '';
    return +index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

// Test
export const splitUrlParams = (urlParams: string) => {
  const params = urlParams.split('&')
  const arrvars: any = []
  for (let index = 0; index < params.length; index++) {
    const element = params[index]
    const vals = element.split('=')
    arrvars[vals[0]] = vals[1]
  }

  return arrvars
}

export const regDate = (date: string) => {
  return /\d{4}-\d{2}\-\d{2}/.test(date)
}

export const isValidDate = (dates: string[], format = 'date') => {
  for (const i in dates) {

    switch (format) {
      case 'date':
        if (!/^\d{4}-\d{2}\-\d{2}$/.test(dates[i])) return false
        break
      case 'timestamp':
        if (!/^\d{4}-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/.test(dates[i])) return false
        break
      default:
        return false
    }

  }

  return true
}

export const isValidEmail = (value: string) => {
  return /^[a-z0-9_\.\-]+@[^\-](?:[\w\-]+[^\-]\.[^\-])?[\w\-]+[^\-]\.[a-z]{2,4}$/i.test(value)
}

export const isValidString = (value: any, emptyAllowed = false) => {

  return emptyAllowed ? typeof value === 'string' : typeof value === 'string' && /\w+/.test(value)
}

// Test
export const cleanString = (value: any) => value
  .replace(/<script[^>]*>|<\/script>/g, '')
  //.replace(/\W+/g, '')    // Quita caracteres no w, incluidos acentos y espacios en blanco
  .replace(/\s+/g, ' ')
  .trim()

export const ipToNumber = (ip: string) => {
  return ip.split('.').reduce(function (ipInt, octet) { return (ipInt << 8) + parseInt(octet, 10) }, 0) >>> 0
}

export const numberToIp = (number: number): string => {
  return ((number >>> 24) + '.' + (number >> 16 & 255) + '.' + (number >> 8 & 255) + '.' + (number & 255));
}

export const codeGenerator = (string: string) => {
  let letters = string.split("").reduce((acc: string, key: string) => {
    if (!/^[aeiouAEIOUáéíóúÁÉÍÓÚ]/.test(key)) acc += key
    return acc
  }, "")
  if (letters.length < 3) letters = ("000" + letters)
  return letters.substring(0,3).toLocaleUpperCase()
}
