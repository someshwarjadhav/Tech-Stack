import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  
  isSidebarOpen = signal(false);

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }
}
