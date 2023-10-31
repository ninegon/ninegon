import { ArgumentMetadata, Optional, PipeTransform, ValidationPipeOptions } from '@nestjs/common';
import { createErrorFromPipe } from '../errors';

export interface ParseValidIntOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean,
  int0?: boolean,
  intUnder0?: boolean
}

export class ParseValidIntPipe implements PipeTransform {

  constructor(
    @Optional() private readonly options: ParseValidIntOptions = {}
  ) { }

  public transform = (value: any, metadata: ArgumentMetadata) => {
    value = +Number(value)
    if ((typeof value == 'undefined' || value == 0) && this.options.optional) return +value
    // if ((R.isNil(value) || value == 0) && this.options.optional) return value
    else if(value == 0 && this.options.int0) return +value
    else if(value <= 0 && this.options.intUnder0) return value


    if (value > 0) return value
    
    throw createErrorFromPipe('Given input is not a valid data', metadata)
  }
}