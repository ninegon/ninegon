import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MailService } from '../service/mail.service';
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Multer } from 'multer'

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('sendRequest')
  async sendRequest(@Body('contact') contact: string, @Body('message') message: string) {
    try {
      await this.mailService.sendContactUs(contact, message)
    } catch (e) {
      return e
    }
  }
  
}
