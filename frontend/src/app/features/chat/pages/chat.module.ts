// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialModule } from '@shared/modules/material.module';

// Custom Modules
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponentsModule } from '../components/chat-components.module';
import { ComponentsModule } from '@shared/components/components.module';

// Custom Components
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ChatRoutingModule,
    ChatComponentsModule,
    ComponentsModule,

    MaterialModule
  ]
})
export class MessageModule { }
