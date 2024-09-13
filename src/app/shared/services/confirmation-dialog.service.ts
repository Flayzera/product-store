import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Delete Product</h2>
    <mat-dialog-content>
      Are you sure you want to delete this product?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">No</button>
      <button mat-raised-button color="accent"  (click)="onYes()" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)

  onYes() {
    this.matDialogRef.close(true)
  }

  onNo() {
    this.matDialogRef.close(false)
  }
}

@Injectable({
  providedIn: 'root'
})

export class ConfirmationDialogService {

  matDialog = inject(MatDialog)

  constructor() {}

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent).afterClosed()

  }
}
