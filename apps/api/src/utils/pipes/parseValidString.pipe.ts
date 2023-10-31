import { ArgumentMetadata, Optional, PipeTransform, ValidationPipeOptions } from '@nestjs/common';
import { createErrorFromPipe } from '../errors';
import { R } from '../misc/R'
import { cleanString } from '../misc/string';

enum ErrorMessage {
  NO_NUMBER = 'Given item must be a number.',
  NO_TYPE = 'Type is not ready.',
  NO_PARSE = 'Given input is not parsable.',
  NO_VALID = 'Given input is not a valid data',
}

export interface ParseValidStringOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean,
  empty?: boolean,
  format?: string
}

export class ParseValidStringPipe implements PipeTransform {

  constructor(
    @Optional() private readonly options: ParseValidStringOptions = {}
  ) { }

  public transform = (value: any, metadata: ArgumentMetadata) => {
    //if (value === null || value === undefined)
    if (R.isNil(value))
      if (this.options.optional) return value
      else throw createErrorFromPipe('Given input is not a valid data', metadata)

    if (!(typeof value === 'string')) throw createErrorFromPipe(ErrorMessage.NO_VALID, metadata)

    value = cleanString(value)
    // value = value.trim().replace(/<script[^>]*>|<\/script>/g, '').replace(/\s+/g, ' ')

    if (this.options.format) {
      const formato = this.options.format.toLowerCase()
      if (formato === 'yyyy-mm-dd' && /^\d{4}\-\d{2}\-\d{2}$/.test(value)) return value
      if (formato === 'dd-mm-yyyy' && /^\d{2}\-\d{2}\-\d{4}$/.test(value)) return value
    } else {
      if (value.length) return value
      // if (value.length) return value
      else if (!value.length && this.options.empty) return value
    }

    throw createErrorFromPipe('Given input is not a valid data', metadata)
  }



}