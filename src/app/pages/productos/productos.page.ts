import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosPage implements OnInit {
  
  products: Product[] = [];
  showNewTaskForm = false;
  newTaskForm: FormGroup;
  editMode = false;
  currentProductId: string | null = null;

  constructor(private productsService: ProductsService, private fb: FormBuilder) {
    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      active: [true]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  openNewTaskForm() {
    this.showNewTaskForm = true;
    this.editMode = false;
    this.newTaskForm.reset({ active: true });
  }

  closeNewTaskForm() {
    this.showNewTaskForm = false;
    this.editMode = false;
    this.currentProductId = null;
  }

  loadProducts() {
    this.productsService.getAllProducts().then(response => {
      this.products = response;
    }).catch(error => {
      console.error('Error al cargar los productos', error);
    });
  }

  addTask() {
    if (this.newTaskForm.valid) {
      const newTaskWithId: Product = { ...this.newTaskForm.value, _id: Date.now().toString() }; // Agregar un identificador único
      this.productsService.addProduct(newTaskWithId).then(product => {
        this.products.push(product);
        this.newTaskForm.reset({ active: true });
        this.closeNewTaskForm();
      }).catch(error => {
        console.error('Error al agregar el producto', error);
      });
    } else {
      this.newTaskForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
    }
  }

  deleteTask(taskId: string) {
    this.productsService.deleteProduct(taskId).then(() => {
      this.products = this.products.filter(product => product._id !== taskId);
    }).catch(error => {
      console.error('Error al eliminar el producto', error);
    });
  }

  editTask(task: Product) {
    this.editMode = true;
    this.currentProductId = task._id;
    this.newTaskForm.patchValue(task);
    this.showNewTaskForm = true;
  }

  updateTask() {
    if (this.newTaskForm.valid && this.currentProductId !== null) {
      const updatedTask: Product = { ...this.newTaskForm.value, _id: this.currentProductId };
      this.productsService.updateProduct(updatedTask).then(updatedProduct => {
        const index = this.products.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.newTaskForm.reset({ active: true });
        this.closeNewTaskForm();
      }).catch(error => {
        console.error('Error al actualizar el producto', error);
      });
    } else {
      this.newTaskForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
    }
  }

  trackBy(index: number, product: Product): string {
    return product._id;
  }
}