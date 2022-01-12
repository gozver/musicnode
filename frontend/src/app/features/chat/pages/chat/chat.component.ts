import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { ChatService } from '@shared/services/chat.service';

import { User } from '@shared/interfaces/user.interface';
import { Message } from '@shared/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // Users
  currentUser: User = null;
  selectedUser: User = null;
  usersList: User[] = [];
  
  // Messages
  message: string = '';
  feedback: string = '';
  messagesList: Message[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
    this.getSocketData();
  }

  getComponentData(): void {
    forkJoin([
      this.authService.currentUser$.pipe(take(1)),
      this.userService.getUsers()
    ]).subscribe(([ currentUser, usersList ]) => { 
      this.currentUser = currentUser;
      this.usersList = usersList.filter(user => user.id !== this.currentUser.id);
    });
  }

  getSocketData(): void {
    this.chatService.listen('type')
      .subscribe((data) => this.updateFeedback(data));
    
    this.chatService.listen('chat')
      .subscribe((data) => this.updateMessage(data));  
  }

  selectUser(id: number): void {
    this.message = this.feedback = '';

    this.selectedUser = this.usersList.find(user => user.id === id);

    this.chatService.getMessages(this.currentUser.id, this.selectedUser.id)
      .subscribe(messagesList => this.messagesList = messagesList);
  }

  // type functions
  sendFeedback(): void {
    this.chatService.emit('type', {
      userId: this.currentUser.id,
      userName: this.currentUser.name
    });
  }

  updateFeedback(data: any): void {
    if (data.userId !== this.currentUser.id) {
      this.feedback = `${data.userName} is writing a message ...`;
    }

    setTimeout(() => { 
      this.feedback = ''
    }, 8000);
  }

  // Chat functions
  sendMessage(): void {
    this.feedback = '';

    if (!!!this.message) return;

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
  
  sanitizeMessage(userId: number): boolean {
    return userId === this.currentUser.id || userId === this.selectedUser.id;
  }
}
