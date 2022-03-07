import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() currentUser: User;
  @Output() delete = new EventEmitter<number>();
  
  rolesList: any[] = [];
  displayedColumns: string[] = ['role', 'name', 'actions'];
  dataSource = this.rolesList;


  constructor(
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data.subscribe(rolesList => {
      this.rolesList = [...rolesList];
      this.cd.markForCheck();
    });
  }

  deleteRole(id: number): void {
    this.delete.emit(id);
  }
}
