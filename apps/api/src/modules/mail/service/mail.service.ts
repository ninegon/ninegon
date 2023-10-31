import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
  }


  public sendContactUs = async (contact: string, message: string) => {
    await this.mailerService.sendMail({ to: [process.env.EMAIL_USER], subject: 'Nuevo mensaje', template: 'contactUs.hbs', context: { contact, message: message.replace(/(\r\n|\n|\r)/gm, '<br>') }, bcc: [process.env.EMAIL_USER] })
  }
}
