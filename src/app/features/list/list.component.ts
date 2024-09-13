import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'

import { ProductsService } from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/IProduct'

import { CardComponent } from './components/card/card.component'



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = []

  productsService = inject(ProductsService)
  router = inject(Router)


  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    })
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }
}
