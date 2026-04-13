import { Injectable } from '@angular/core';
import { User, UserWithPassword } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserWithPassword[] = [];

  register(user: UserWithPassword): User {
    this.users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  validateCredentials(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
