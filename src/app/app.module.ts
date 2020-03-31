import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogShowUsersComponent } from './dialog-show-users/dialog-show-users.component';

import { snack } from '../config/constants';

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    DialogDeleteComponent,
    DialogEditComponent,
    DialogAddUserComponent,
    DialogShowUsersComponent
  ],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DialogDeleteComponent,
    DialogEditComponent,
    DialogAddUserComponent,
    DialogShowUsersComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: snack.duration,
        verticalPosition: snack.verticalPosition,
        horizontalPosition: snack.horizontalPosition,
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
