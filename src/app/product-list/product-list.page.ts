import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProductListPage implements OnInit {

  products: Product[] = [

  ];

  productsService = inject(ProductsService);

  constructor() { }

  async ngOnInit() {


    const response = await this.productsService.getAllProducts();
    this.products = response.results;

  // this.productsService.getAllProducts().then(response => {
      // this.products = response.results;
   //  });
  }
  trackById(index: number, product: Product) {
    return product._id;
  }
}
