import { Component, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm!: NgForm;
  
  constructor(private conexionService : ConnexionService) { }

  register() {
    const email = this.registerForm.value.email; // Read email from form
    const password = this.registerForm.value.password; // Read password from form
    this.conexionService.register(email, password);
  }
}
