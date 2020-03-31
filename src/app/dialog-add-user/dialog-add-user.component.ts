import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { angularComponent, routes, snack } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: angularComponent.templateUrl.dialogAddUser,
  styleUrls: angularComponent.styleUrls.dialogAddUser
})
export class DialogAddUserComponent implements OnInit {

  constructor(
    private http: HttpClient, // To make HTTP requests
    public dialogRef: MatDialogRef<DialogAddUserComponent>, // To make this component dialog
    private snackBar: MatSnackBar // To inform about some processes in the application
  ) { }

  user: string;
  users: any;

//********************************************************** Main methods *****************************************
  ngOnInit(): void{
    this.getUsers()
  }

  add(): void {
    if(this.users.indexOf(this.user) >= 0) {
      this.snackBar.open(snack.user.exist, snack.undo);
    } else {
      this.addUser();
    }
  }

  isUsernameValid(): boolean {
    return this.user && this.users.indexOf(this.user) < 0
  }
//****************************************************** End of main methods *****************************************

//******************************************** Methods to interact with server through HTTP ***********************************
  addUser() {
    this.http.post(`${routes.serverURL}/${routes.users}`, {
      user_name: this.user
    }).subscribe(result => {
      if (result['isOkay']) {
        this.getUsers();
        this.snackBar.open(snack.user.add, snack.undo);
      } else {
        this.snackBar.open(snack.user.exist, snack.undo);
      }
    });
  }

  getUsers(): void {
    this.http.get(`${routes.serverURL}/${routes.users}`).subscribe(allUsers => {
      // @ts-ignore
      this.users = allUsers.map(user => user.user_name);
    })
  }
//******************************************** Methods to interact with server through HTTP ***********************************

// Close the dialog
  cancel(): void {
    this.dialogRef.close();
  }
}
