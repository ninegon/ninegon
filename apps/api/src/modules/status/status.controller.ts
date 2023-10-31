import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../core/BaseController';
var pjson = require('./../../../../../package.json');

@Controller('status')
export class StatusController extends BaseController {
  @Get('ping')
  ping() {
    return this.returnData({
      status: 'OK',
      version: pjson.version + (process.env.NODE_ENV === 'development' ? '-dev' : ''),
      _server: {
        _date: new Date().toLocaleString('es-ES'),
        _node: process.env.NODO
      }
    })
  }
}
