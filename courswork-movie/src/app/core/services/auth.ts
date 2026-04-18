import { Injectable, inject, signal, computed } from '@angular/core';
import { User, LoginCredentials, UserForAuth, ProfileUpdate } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  login(data: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data, { withCredentials: true });
  }

  register(user: UserForAuth): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile(profileData: ProfileUpdate): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, profileData, { withCredentials: true });
  }

  setSession(user: User): void {
    this.user.set(user);
  }
  
  clearSession(): void {
    this.user.set(null);
  }
}
