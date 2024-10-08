import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { filter } from 'rxjs/operators'

import { ProductsService } from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/IProduct'
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service'

import { CardComponent } from './components/card/card.component'


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products'])

  productsService = inject(ProductsService)
  router = inject(Router)
  matDialog = inject(MatDialog)
  confirmationDialgService = inject(ConfirmationDialogService)


  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }

  onDelete(product: Product) {
    this.confirmationDialgService.openDialog()
    .pipe(filter ((answer) => answer === true))
    .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products.set(products)
          })
        })
      })
  }
}
