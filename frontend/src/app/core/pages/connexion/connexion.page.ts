import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.sass']
})
export class ConnexionPage {
  constructor(private router: Router) { }

  onLoginSuccess(event: any) {
    console.log('Login successful:', event);
    this.router.navigate(['/home']); // Replace '/home' with the actual path of your homepage
  
  }

  onRegisterSuccess(event: any) {
    console.log('Registration successful:', event);
    // Handle registration success event here
  }
}
