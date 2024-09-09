import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/IProduct';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = []

  productsService = inject(ProductsService)


  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    })
  }
}
