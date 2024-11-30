import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
})
export class HomePage implements OnInit {
  isAuthenticated = false; // Variable para verificar si el usuario está autenticado

  constructor(private appComponent: AppComponent) {}
  ngOnInit() {
    // Verificar si el usuario está autenticado 
    this.isAuthenticated = this.appComponent.isAuthenticated;
  }

}