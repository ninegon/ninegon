import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'ninegon-icon-snack-bar',
  templateUrl: './icon-snack-bar.component.html',
  styleUrls: ['./icon-snack-bar.component.scss'],
})
export class IconSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<IconSnackBarComponent>) { }
}
