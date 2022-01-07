// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom Components
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '', // empty because the path is defined by the parent
  children: [{ 
    path: '',
    component: ChatComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Children or secundaries routes
  exports: [RouterModule]
})
export class ChatRoutingModule { }
