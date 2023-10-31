import { Module, forwardRef } from '@nestjs/common';
import { MailService } from './service/mail.service';
import { MailController } from './controller/mail.controller';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
