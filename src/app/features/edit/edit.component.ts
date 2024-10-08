import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/IProduct';
import { FormComponent } from '../../shared/components/form/form.component';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class EditComponent {

  productsService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)

  product: Product = inject(ActivatedRoute).snapshot.data['product']


  onSubmit(product: Product) {
    this.productsService.put(this.product.id, product).subscribe(() => {
      this.matSnackBar.open('Product edited successfully', 'OK')

      this.router.navigateByUrl('/')
    })
  }

}
