// Angular
import { Component, OnInit } from '@angular/core';

// RxJS
import { Observable, combineLatest } from 'rxjs';

// Services
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { ChatService } from '@app/shared/services/chat.service';

// Models
import { User } from '@shared/interfaces/user.interface';
import { Message } from '@shared/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: string;
  feedback: string;

  currentUser: User;
  selectedUser: User;
  usersList: User[] = [];
  messagesList: Message[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.feedback = '';

    this.authService.currentUser$
      .subscribe(currentUser => this.currentUser = currentUser);
    
    this.userService.getUsers()
      .subscribe(usersList => this.usersList = usersList.filter (user => user.id !== this.currentUser.id));

    this.chatService.listen('typing')
      .subscribe((data) => this.updateFeedback(data));
    
    this.chatService.listen('chat')
      .subscribe((data) => this.updateMessage(data));
  }

  // Component functions
  selectUser(id: number): void {
    this.message = '';
    this.feedback = '';

    this.selectedUser = this.usersList.find(user => user.id === id);

    this.chatService.getMessages(this.currentUser.id, this.selectedUser.id).subscribe(messagesList => {
      this.messagesList = messagesList;

      console.log('--> messagesList:');
      console.log(messagesList);
    });
  }

  // Typing functions
  sendFeedback(): void {
    console.log(`--> ${this.currentUser.name} is writing a message ...`);
    this.chatService.emit('typing', this.currentUser.name);
  }

  updateFeedback(data: any): void {
    this.feedback = `${data} is writing a message ...`;

    setTimeout(() => { 
      this.feedback = '' 
    }, 3000);
  }

  // Chat functions
  sendMessage(): void {
    this.feedback = '';

    const last = this.messagesList.length > 0 ? this.messagesList.slice(-1)[0].id : 1;

    this.chatService.emit('chat', {
      id: last + 1,
      body: this.message,
      userId: this.currentUser.id,
      recipient: this.selectedUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  
  updateMessage(data: any): void {
    this.feedback = '';
    
    if (!!!data) return;
    
    // Add the new message to the messageList array
    this.messagesList.push(data);

    console.log('--> this.messagesList:');
    console.log(this.messagesList);
    
    // avoid creating a duplicated message in the broadcasted client
    if (this.message) {
      // insert the new message into the db only from the current client
      this.chatService.createMessage(this.message, this.currentUser.id, this.selectedUser.id).subscribe();
    }

    this.message = '';
  }
}
