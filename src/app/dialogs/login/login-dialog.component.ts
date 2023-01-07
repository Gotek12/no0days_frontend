import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenubarComponent } from '../../menubar/menubar.component';
import { LoginData } from '../../../defs/loginData';

@Component({
	selector: 'nod-login-dialog',
	templateUrl: './login-dialog.component.html',
	styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
	@Output() resolve = new EventEmitter<LoginData>();
	constructor(private dialogRef: MatDialogRef<MenubarComponent>, @Inject(MAT_DIALOG_DATA) public data: LoginData) {}

	login(): void {
		this.resolve.emit(this.data);
		this.close();
	}

	close(): void {
		this.dialogRef.close();
	}
}
