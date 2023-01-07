import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'nod-menubar',
	templateUrl: './menubar.component.html',
	styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit, OnDestroy {
	isLogged: boolean;

	authSubscription: Subscription;

	userName: string = '';

	constructor(
		public authService: AuthService,
		protected jwtTokenService: JwtTokenService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.isAuthenticated().subscribe((logged) => {
			this.isLogged = logged;
			if (logged) {
				this.userName = this.jwtTokenService.getUserName();
			}
		});
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}

	// todo skończyć dialog
	// openLogInDialog(): void {
	// 	const dialogConfig = new MatDialogConfig();
	// 	dialogConfig.data = {
	// 		password: this.password,
	// 		username: this.username,
	// 	};
	//
	// 	let ref = this.dialog.open(LoginDialogComponent, dialogConfig);
	//
	// 	const dialogSubmitSubscription = ref.componentInstance.resolve.subscribe((result) => {
	// 		console.log(result);
	// 		dialogSubmitSubscription.unsubscribe();
	// 	});
	// }
}
