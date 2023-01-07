import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtTokenService } from '../services/jwt-token.service';
import { noop } from 'rxjs';

@Component({
	selector: 'nod-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	constructor(
		private route: ActivatedRoute,
		protected jwtTokenService: JwtTokenService,

		private router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			const { token } = params;
			if (token) {
				jwtTokenService.saveToken(token);
				this.router.navigate(['/']).then(() => noop());
			}
		});
	}
}
