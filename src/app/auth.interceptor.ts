import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtTokenService } from './services/jwt-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private jwtTokenService: JwtTokenService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const jwtToken = this.jwtTokenService.getToken();
		if (jwtToken) {
			const prepareRequest = request.clone({
				headers: request.headers.set('Authorization', 'Bearer ' + jwtToken),
			});
			return next.handle(prepareRequest);
		}
		return next.handle(request);
	}
}
