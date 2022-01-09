import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/modules/material.module';

import { ChatRoutingModule } from './chat-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,

    ChatRoutingModule,
    ComponentsModule
  ]
})
export class MessageModule { }
