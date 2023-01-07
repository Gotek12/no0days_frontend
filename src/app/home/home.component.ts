import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtTokenService } from '../core/services/jwt-token.service';
import { noop } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
	selector: 'nod-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	constructor(
		private route: ActivatedRoute,
		protected authService: AuthService,

		private router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			const { token } = params;
			if (token) {
				this.authService.saveToken(token);
				this.router.navigate(['/']).then(() => noop());
			}
		});
	}
}
