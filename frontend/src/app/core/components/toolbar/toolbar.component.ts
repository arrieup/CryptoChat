import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat } from '../../models/chat.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {

  sidenavToggleState : boolean = true;
  @Input() inputSideNav: MatSidenav | undefined;

  constructor(){}

}
