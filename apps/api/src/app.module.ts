import { Module } from '@nestjs/common';

import { MailModule } from './modules/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { StatusModule } from './modules/status/status.module';
@Module({
  imports: [
    MailModule,
    StatusModule,
    MailerModule.forRoot({
      transport: process.env.EMAIL_TRANSPORT,
      defaults: {
        from: process.env.EMAIL_FROM,
      },
      template: {
        dir: join(__dirname, 'assets/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ]
})
export class AppModule { }
