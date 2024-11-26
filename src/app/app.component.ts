import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
//import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule],
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    this.isAuthenticated = !!authToken; // Verificar si el token existe
    if (!authToken) {
      this.router.navigate(['/login']); // Redirigir a la página de login si no hay token
    }
  }

  logout() {
    // Lógica para cerrar sesión, por ejemplo, eliminar tokens de autenticación
    localStorage.removeItem('authToken'); // Ejemplo de eliminación de token
    this.isAuthenticated = false;
    this.router.navigate(['/home']); // Redirigir a la página de inicio
  }
}