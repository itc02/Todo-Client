import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { angularComponent, routes, snack } from '../../config/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: angularComponent.templateUrl.dialogShowUsers,
  styleUrls: angularComponent.styleUrls.dialogShowUsers
})
export class DialogShowUsersComponent implements OnInit {

  constructor(
    private http: HttpClient, // To make HTTP requests
    public dialogRef: MatDialogRef<DialogShowUsersComponent>, // To make this component dialog
    private snackBar: MatSnackBar // To inform about some processes in the application
  ) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  users: any = [];
  owners: any;
  selection = new SelectionModel(true, [])
  columns = ['select', 'name'];

//******************************************************* Main methods **********************************************
  ngOnInit() {
    this.http.get(`${routes.serverURL}/${routes.users}`).subscribe(allUsers => {
      // @ts-ignore
      this.users = new MatTableDataSource(allUsers);
      this.users.paginator = this.paginator;
    });
    this.http.get(`${routes.serverURL}/${routes.getOwners}`).subscribe(owners => {
      this.owners = owners;
      console.log(this.owners, 5555)
    })
  }

  delete() {
    let isThereAnOwner: boolean = false;
    for(let i = 0; i < this.selection.selected.length; i++) {
      if(this.owners.includes(this.selection.selected[i].user_name)) {
        isThereAnOwner = true;
        break;
      }
    }
    if(isThereAnOwner) {
      this.snackBar.open(snack.user.owner, snack.undo)
    } else {
      this.http.delete(`${routes.serverURL}/${routes.users}/${this.selection.selected.map(row => row.id)}`).subscribe(allUsersWithoutDeleted => {
        // @ts-ignore
        this.users = new MatTableDataSource(allUsersWithoutDeleted);
        this.users.paginator = this.paginator;
        this.snackBar.open(snack.user.delete, snack.undo);
      });
    }
  }

  isUserSelected(): boolean {
    return this.selection.selected.length > 0
  }
//*************************************************** End of main methods ********************************************

//*************************************************** Methods for checkboxes *******************************************
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.filteredData && this.users.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.users.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
//********************************************** End of methods for checkboxes ***********************************************

//********************************************** Method for filtration *******************************************************
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
//****************************************** End of method for filtration ****************************************************

// Close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}
