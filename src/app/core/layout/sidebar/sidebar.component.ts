import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  layout = inject(LayoutService);
  logoUrl = 'https://lens.gosset.ai/favicon.png';
  isLoading = false;

  navItems = [
    {
      label: 'Disease Biology',
      route: '/obesity/disease-biology',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      label: 'Standard of Care',
      route: '/obesity/standard-of-care',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      color: 'text-teal-600',
      bg: 'bg-teal-100',
    },
    {
      label: 'Disease Biology - I',
      route: '/obesity/gayatri',
      icon: 'M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0-6a10 10 0 100 20 10 10 0 000-20z',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      label: 'Disease Biology - II',
      route: '/obesity/muskan',
      icon: 'M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-4-1.8-4-4zm0-6a10 10 0 100 20 10 10 0 000-20z',
      color: 'text-fuchsia-600',
      bg: 'bg-fuchsia-100',
    },
    {
      label: 'Epidemiology & Market',
      route: '/market',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Clinical Results',
      route: '/clinical-data',
      icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Pipeline',
      route: '/pipelines',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      label: 'Simulator',
      route: '/simulator',
      icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];
}