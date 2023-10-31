import { ArgumentMetadata, Injectable, Optional, PipeTransform, Type, ValidationPipeOptions } from "@nestjs/common"
import { ArbitraryObj } from "../../@types"
import { createErrorFromPipe } from "../errors"

enum ErrorMessage {
  NO_VALUE = 'There is no data in object',
  NULL = 'Values are no valid'
  //INVALID_MODE = 'rate mode must be one of [HOURS, DAYS]',
}

export interface ParseValidObjectOptions
  extends Omit<ValidationPipeOptions, 'transform' | 'validateCustomDecorators' | 'exceptionFactory'> {
  optional?: boolean,
  empty?: boolean,
  format?: string,
  objType: Type<unknown>
}

@Injectable()
export class ParseValidObjectPipe implements PipeTransform {
  constructor(
    @Optional() private readonly options: ParseValidObjectOptions = { objType: String }
  ) { }

  transform(obj: any, metadata: ArgumentMetadata): any {
    if (Object.keys(obj).length === 0) throw createErrorFromPipe(ErrorMessage.NO_VALUE, metadata)
    return this.formatObj(obj)
  }

  protected formatObj = (obj: ArbitraryObj) => {
    for(const key in obj){
      if(obj[key] instanceof Object) obj[key] = this.formatObj(obj[key])
      if(/^\d{4}\-\d/.test(obj[key])){}
    }
    return obj
  }
}