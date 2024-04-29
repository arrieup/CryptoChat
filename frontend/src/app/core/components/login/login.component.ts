import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;
  
  @Output() loginSuccess = new EventEmitter<any>();

  constructor(private conexionService : ConnexionService) { }

  login() {
    const email = this.loginForm.value.email; // Read email from form
    const password = this.loginForm.value.password; // Read password from form
    this.conexionService.login(email, password).subscribe(
      data => {
        const updatedHeaders = ConnexionService.httpOptions.headers.set('Authorization', 'Bearer ' + data['user']['idToken']);
        ConnexionService.httpOptions = { headers : updatedHeaders};
        ConnexionService.currentUser = new User(email, undefined, email);
        this.loginSuccess.emit(data['user']);
      }
    );

  }
}