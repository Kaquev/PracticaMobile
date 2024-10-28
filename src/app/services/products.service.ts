import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Product {
  _id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  active: boolean;
}

type ApiReponse = { page: number; per_page: number; total: number; total_pages: number; 
  results: Product[] };

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAllProducts() : Promise<ApiReponse> {
    return firstValueFrom
      (this.httpClient.get<ApiReponse>('https://peticiones.online/api/products'));
  }
  
}
