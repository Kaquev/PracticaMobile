import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosPage implements OnInit {
  
  products: Product[] = [];
  showNewTaskForm = false;
  newTask: Product = { _id: 0, name: '', price: 0, description: '', category: '', image: '', active: true };

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  openNewTaskForm() {
    this.showNewTaskForm = true;
  }

  closeNewTaskForm() {
    this.showNewTaskForm = false;
  }

  loadProducts() {
    this.productsService.getAllProducts().then(response => {
      this.products = response.results;
    }).catch(error => {
      console.error('Error al cargar los productos', error);
    });
  }

  addTask() {
    if (this.newTask.name && this.newTask.description && this.newTask.image) {
      const newTaskWithId: Product = { ...this.newTask, _id: Date.now() }; // Agregar un identificador único
      this.products.push(newTaskWithId);
      localStorage.setItem('products', JSON.stringify(this.products)); // Guardar en localStorage
      this.newTask = { _id: 0, name: '', price: 0, description: '', category: '', image: '', active: true };
      this.closeNewTaskForm();
    }
  }

  deleteTask(taskId: number) {
    this.products = this.products.filter(product => product._id !== taskId);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  editTask(task: Product) {
    const index = this.products.findIndex(p => p._id === task._id);
    if (index !== -1) {
      this.products[index] = task;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  trackBy(index: number, product: Product): number {
    return product._id;
  }
}