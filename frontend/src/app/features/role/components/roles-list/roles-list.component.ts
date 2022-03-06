import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/interfaces/user.interface';

export interface PeriodicElement {
  role: string;
  name: number;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { role: 'Hydrogen',  name: 1.0079, actions: 'H'},
  { role: 'Helium',    name: 4.0026, actions: 'He'},
  { role: 'Lithium',   name: 6.941,  actions: 'Li'},
  { role: 'Beryllium', name: 9.0122, actions: 'Be'},
  { role: 'Boron',     name: 10.811, actions: 'B'},
  { role: 'Carbon',    name: 12.0107, actions: 'C'},
  { role: 'Nitrogen',  name: 14.0067, actions: 'N'},
  { role: 'Oxygen',    name: 15.9994, actions: 'O'},
  { role: 'Fluorine',  name: 18.9984, actions: 'F'},
];

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() currentUser: User;

  rolesList: any[] = [];
  displayedColumns: string[] = ['role', 'name', 'actions'];
  dataSource = this.rolesList;


  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data.subscribe(rolesList => {
      this.rolesList = [...rolesList];
      this.cd.markForCheck();
    });
  }
}
