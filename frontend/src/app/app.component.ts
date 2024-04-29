import { Component } from '@angular/core';
import { ConnexionService } from './core/services/connexion.service';
import { MessageService } from './core/services/message.service';
import { Message } from './core/models/message.model';
import { User } from './core/models/user.model';
import { Chat } from './core/models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'CryptoChat';
  time = "";

  public toggleMode : boolean;
  public toggleText : string;

  localChat = new Chat();
  database : Array<Chat> = [];
  constructor(){
    this.toggleMode = false;
    this.toggleText = "LogIn"
  }

  public Toggle(){
    this.toggleMode = !this.toggleMode
    this.toggleText = this.toggleMode ? "Register" : "Login"
  }
}
