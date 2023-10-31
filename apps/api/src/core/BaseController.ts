import { HttpException, HttpStatus } from '@nestjs/common';
import { response } from 'express';
import { DateUtils } from '../utils/dates/dateUtils';
import moment from 'moment';

export class BaseController {

  protected checkEmptyValue = (str) => !str || !`${str}`.trim().length;

  private errorStatusDefault = HttpStatus.CONFLICT
  private errorMessageDefault = 'Unexpected internal error'

  protected error = (error: string | HttpException | TypeError, status?: HttpStatus) => {
    // protected error = (mensaje: string, T: HttpStatus = HttpStatus.NOT_FOUND) => {
    let mensaje: string = <any>undefined
    if (/^String$/.test(error.constructor.name)) {
      mensaje = <string>error
    } else if (/^(TypeError|QueryFailedError)$/.test(error.constructor.name)) {
      mensaje = (<any>error).customMessage
    } else if (/^HttpException$/.test(error.constructor.name)) {
      mensaje = (<HttpException>error)['response']
      status = (<HttpException>error)['status']
    }
    throw new HttpException(mensaje ? mensaje : this.errorMessageDefault, status || this.errorStatusDefault)
  }

  protected returnData = (data, request?, status = 200) => {
    if (!data) this.error('No data to return')
    if (Array.isArray(data) && !data[0]) this.error('No data to return')
    response.status(status)
    return data
  }

}

