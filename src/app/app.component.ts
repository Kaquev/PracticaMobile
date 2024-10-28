import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
//import {IonRouterOutlet} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class AppComponent {
  constructor() {}
}