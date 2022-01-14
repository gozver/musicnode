import { UserService } from '@shared/services/user.service';
import { Component, OnInit } from '@angular/core';

import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  usersList: User[] = [];
  
  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(usersList => {
      this.usersList = usersList
      
      console.log('--> this.usersList:');
      console.log(this.usersList);
    });
  }
}
