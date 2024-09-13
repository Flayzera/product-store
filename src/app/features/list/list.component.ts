import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'

import { ProductsService } from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/IProduct'

import { CardComponent } from './components/card/card.component'
import { filter } from 'rxjs'

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
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  products: Product[] = []

  productsService = inject(ProductsService)
  router = inject(Router)
  matDialog = inject(MatDialog)


  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    })
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.ngOnInit()
        })
      })
  }
}
