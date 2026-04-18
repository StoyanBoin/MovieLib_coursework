import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NotificationService } from '../services/notification';
import { inject } from '@angular/core/primitives/di';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

const AUTH_ENDPOINTS = [
  '/api/login',
  '/api/register',
];

function isAuthEndpoint(url: string): boolean {
  return AUTH_ENDPOINTS.some(endpoint => url.includes(endpoint));
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.error instanceof ErrorEvent) {
        errorMessage = err.error.message;
      } else {
        switch (err.status) {
          case 400:
            errorMessage = err.error?.message || 'Bad request. Please check your input.';
            break;
          case 401:
            if (!isAuthEndpoint(req.url)) {
              errorMessage = err.error?.message || 'Unauthorized. Please log in.';

            } else {
              errorMessage = 'Session expired. Please log in again.';
              authService.clearSession();
              router.navigate(['/login']);
            }
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission to perform this action.';
            break;
          case 404:
            errorMessage = err.error?.message || 'Not found. The requested resource does not exist.';
            break;
          case 409:
            errorMessage = err.error?.message || 'Conflict. The resource already exists.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = err.error?.message || `Error ${err.status}`;
        }
      }

      notificationService.showError(errorMessage);
      return throwError(() => err);

    })
  )
};
