import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from "./core/components/message/message.component";
import { ChatComponent } from './core/components/chat/chat.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { ConnexionPage } from './core/pages/connexion/connexion.page';
import { ChatListComponent } from './core/components/chat-list/chat-list.component';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { HomeComponent } from './core/pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        MessageComponent,
        LoginComponent,
        RegisterComponent,
        ConnexionPage,
        ChatListComponent,
        ToolbarComponent,
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatSlideToggleModule,
        HttpClientModule,
        MatTooltipModule,
    ]
})
export class AppModule { }