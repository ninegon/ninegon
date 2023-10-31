import { ArgumentMetadata, Optional, PipeTransform, ValidationPipeOptions } from '@nestjs/common';
import { createErrorFromPipe } from '../errors';

export interface ParseValidBooleanOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean,
  //int0?: boolean,
  //intUnder0?: boolean
}

export class ParseValidBooleanPipe implements PipeTransform {

  constructor(
    @Optional() private readonly options: ParseValidBooleanOptions = {}
  ) { }

  public transform = (value: any, metadata: ArgumentMetadata) => {

    if (typeof value === 'boolean') return value

    if (typeof value === 'undefined' && this.options.optional) return false
    if (typeof value === 'string') return value === 'true'
    if (value === 1) return true
    if (value === 0) return false

    throw createErrorFromPipe('Given input is not a valid data', metadata)
  }
}