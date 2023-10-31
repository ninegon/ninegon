import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment'
import * as CryptoJS from 'crypto-js';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Sort } from '@angular/material/sort';
@Injectable({
    providedIn: 'root'
})
export class MainService {

    // private offLineOppened: MatDialogRef<OfflineComponent, any>

    public interval?: any

    public broadcastRefresh = new BehaviorSubject<Date>(new Date)
    public broadcastPush = new BehaviorSubject<{ tab: string, value: number }[]>([])


    public isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)

    public needsToUpdate = false;
    public needsToUpdateState = true

    // public bills$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([])
    // public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
    // public payments$: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([])
    // public refounds$: BehaviorSubject<Refound[]> = new BehaviorSubject<Refound[]>([])
    // public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([])
    // public clients$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([])
    // public records$: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([])
    // public emailRecords$: BehaviorSubject<EmailRecord[]> = new BehaviorSubject<EmailRecord[]>([])
    // public setting$: BehaviorSubject<Setting | undefined> = new BehaviorSubject<Setting | undefined>(undefined)

    constructor(

        // public readonly authService: AuthService,

        // private readonly billService: BillService,
        // private readonly userService: UserService,
        // private readonly settingService: SettingService,
        // private readonly paymentService: PaymentService,
        // private readonly refoundService: RefoundService,
        // private readonly countryService: CountryService,
        // private readonly clientService: ClientService,
        // private readonly recordService: RecordService,
        // private readonly emailRecordService: EmailRecordService,

        // public readonly pdfService: PdfService,

        private readonly route: Router,

        private http: HttpClient,
        private dialog: MatDialog,
        private bottomSheet: MatBottomSheet,

        public _snackBar: MatSnackBar,

        public readonly translate: TranslateService
    ) { }

    contactUs(contact: string, message: string) {
        return lastValueFrom(this.http.post(environment.api + 'mail/sendRequest', { contact, message }))
    }

    
}  