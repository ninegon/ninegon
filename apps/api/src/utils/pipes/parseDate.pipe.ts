import { ArgumentMetadata, Injectable, Optional, PipeTransform, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { R } from '../misc/R'
import { DateUtils } from '../dates/dateUtils'
import { createErrorFromPipe } from '../errors'

enum ErrorMessage {
  NO_VALUE = 'parsable date expected',
  INVALID_DATE = 'invalid date or format',
}

const DEFAULT_FORMAT = 'yyyy-MM-dd'

export interface ParseDateOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean
  format?: string
}

@Injectable()
export class ParseDatePipe implements PipeTransform {
  protected readonly validationPipe: ValidationPipe

  constructor(@Optional() private readonly options: ParseDateOptions = {}) {
    this.validationPipe = new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      ...options,
    })
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!value && !this.options.optional) {
      throw createErrorFromPipe(ErrorMessage.NO_VALUE, metadata)
    } else if (R.isNil(value) && this.options.optional) {
      return value
    }

    if (typeof value !== 'string') {
      throw createErrorFromPipe(ErrorMessage.INVALID_DATE, metadata)
    }

    try {
      let format = this.options.format || DEFAULT_FORMAT
      
      // Eliminar transformacion de Date en UTC
      if (/[\w\-\/\\]{10}$/.test(format)) {
        value += ' 00:00:00+00';
        format += ' HH:mm:ssX'
      } else if(/HH:mm:ss$/.test(format)){
        value += '+00';
        format += 'X'
      }
      
      const val = DateUtils.parse(value, format, new Date())

      if (!DateUtils.isValid(val)) {
        throw new Error(`${format} date format expected`)
      }

      return val
    } catch (error) {
      throw createErrorFromPipe(error.message, metadata)
    }
  }
}
