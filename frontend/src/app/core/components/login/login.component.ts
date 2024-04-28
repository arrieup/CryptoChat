import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConnexionService } from '../../services/connexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private conexionService : ConnexionService) { }

  login() {
    const email = this.loginForm.value.email; // Read email from form
    const password = this.loginForm.value.password; // Read password from form
    this.conexionService.login(email, password);
  }
}