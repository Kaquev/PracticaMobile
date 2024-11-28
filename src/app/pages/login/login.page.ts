import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, 
  IonRow, IonCol, IonText } from '@ionic/angular/standalone';
  import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonContent, IonHeader, CommonModule, FormsModule,IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle,IonRow, IonCol, IonText]
})
export class LoginPage {
  form: FormGroup;
  isAuthenticated: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).catch(error => {
        console.error('Error al iniciar sesión', error);
      });
    }
  }

  validar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }
    const {email,password} = this.form.value
    console.log("Email",email)
    console.log("password",password)
    this.router.navigate(['/productos'])
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

}
   


/*



ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),

      password:new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
    })
  }*/



