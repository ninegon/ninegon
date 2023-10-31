import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/routes/home/home.component';
import { AppRoutingModule } from './modules/angular/app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './modules/material/adapters/intl-paginator.module';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './modules/material/adapters/custom-date.adapter';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { IconSnackBarComponent } from './components/layouts/icon-snack-bar/icon-snack-bar.component';

// import { QuillConfigModule, QuillModule } from 'ngx-quill';

registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconSnackBarComponent
  ],
  imports: [
    // QuillModule.forRoot(),
    // QuillConfigModule.forRoot({
    //   modules: {
    //     syntax: false,
    //     toolbar: [
    //       ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    //       ['blockquote', 'code-block'],

    //       [{ header: 1 }, { header: 2 }], // custom button values
    //       [{ list: 'ordered' }, { list: 'bullet' }],
    //       [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    //       [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    //       [{ direction: 'rtl' }], // text direction

    //       [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    //       [{ header: [1, 2, 3, 4, 5, 6, false] }],

    //       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    //       [{ font: [] }],
    //       [{ align: [] }],

    //       ['clean'],
    //     ],
    //   },
    // }),
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
