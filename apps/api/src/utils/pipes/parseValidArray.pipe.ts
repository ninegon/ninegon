import * as validator from 'class-validator';

import { ArgumentMetadata, Optional, PipeTransform, Type, ValidationPipeOptions } from '@nestjs/common';
import { createErrorFromPipe } from '../errors';
import { R } from '../misc/R'

enum ErrorMessage {
  NO_NUMBER = 'Given item must be a number.',
  NO_TYPE = 'Type is not ready.',
  NO_PARSE = 'Given input is not parsable.',
}

export interface ParseValidArrayOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean
  type?: Type<unknown>
  sep?: string
}

export class ParseValidArrayPipe implements PipeTransform {
  private readonly type: Type<unknown>;
  private readonly sep: string;

  constructor(@Optional() private readonly options: ParseValidArrayOptions = {}) {
    this.type = options.type || Number;
    this.sep = options.sep || ',';
  }

  private parseAndValidate = (value: any, metadata: ArgumentMetadata) => {
    switch (this.type) {
      case Number:

        if(!isNaN(value) && value.length) value = Number(value)

        if (!validator.isNumber(value, { allowNaN: false, allowInfinity: false }))
          throw createErrorFromPipe(ErrorMessage.NO_NUMBER, metadata)
        
        return value;
      
      default: 
        throw createErrorFromPipe(ErrorMessage.NO_TYPE, metadata)
    }
  }

  public transform = (value: any, metadata: ArgumentMetadata) => {
    if (!value && !this.options.optional) {
      throw createErrorFromPipe(ErrorMessage.NO_PARSE, metadata)
    } else if (R.isNil(value) && this.options.optional) {
      return value
    }
    if (Array.isArray(value)) return value
    let items: any;
    try {
      items = value.split(this.sep);
    } catch (error) {
      throw createErrorFromPipe(ErrorMessage.NO_PARSE, metadata)
    }

    return items.map(item => this.parseAndValidate(item, metadata));
  }
}