import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtTokenService } from '../../services/jwt-token.service';
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

	constructor(public authService: AuthService, protected jwtTokenService: JwtTokenService) {}

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
}
