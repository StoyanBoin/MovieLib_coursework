import { computed, Injectable, signal } from '@angular/core';
import { Notification } from '../../shared/interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSignal = signal< Notification | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  notification = computed(() => this.notificationSignal());

  private show(notification: Notification): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.notificationSignal.set(notification);

    this.timeoutId = setTimeout(() => {
      this.notificationSignal.set(null);
      this.timeoutId = null;
    }, 4000);
  }
  
  showSuccess(message: string): void {
    this.show({ message, type: 'success' });
  }

  showError(message: string): void {
    this.show({ message, type: 'error' });
  }
  
}
