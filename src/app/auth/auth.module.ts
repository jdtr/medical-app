import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule {}