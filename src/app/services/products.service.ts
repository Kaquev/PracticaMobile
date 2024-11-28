import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  active: boolean;
}

type ApiResponse = Product[];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://67489ff05801f5153591a905.mockapi.io/api/evu2/products'; // URL base de MockAPI

  constructor() {}

  async getAllProducts(): Promise<ApiResponse> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addProduct(product: Product): Promise<Product> {
    const response = await axios.post(this.apiUrl, product);
    return response.data;
  }

  async deleteProduct(productId: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${productId}`);
  }

  async updateProduct(product: Product): Promise<Product> {
    const response = await axios.put(`${this.apiUrl}/${product._id}`, product);
    return response.data;
  }
}