import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export const ICONS: Record<string, string> = {
  logo: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 110 14 7 7 0 010-14z"/><circle cx="12" cy="12" r="3"/>`,
  'disease-biology': `<path d="M9.5 3.5a2.5 2.5 0 00-2.45 2.98A3 3 0 005 9.5v.28A3 3 0 003 12.5a3 3 0 002 2.83v.17a3 3 0 003 3h.28A3 3 0 0011 20.5a3 3 0 003-1h.5a3 3 0 003-3v-.17a3 3 0 002-2.83 3 3 0 00-2-2.72V10a3 3 0 00-2-2.83 2.5 2.5 0 00-2.45-3.17A2.5 2.5 0 0012 5.5a2.5 2.5 0 00-2.5-2z"/><circle cx="9" cy="9" r="1"/><circle cx="14" cy="8" r="1"/><circle cx="15" cy="14" r="1"/><circle cx="9" cy="15" r="1"/>`,
  'standard-of-care': `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
  'epidemiology': `<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>`,
  'clinical-results': `<path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14"/>`,
  'pipeline': `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v6M18 6a9 9 0 01-9 9"/><circle cx="18" cy="6" r="3"/>`,
  'simulator': `<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>`,
  'chevron-right': `<path d="M9 18l6-6-6-6"/>`,
  'chevron-down': `<path d="M6 9l6 6 6-6"/>`,
  search: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>`,
  'plus': `<path d="M12 5v14M5 12h14"/>`,
  'minus': `<path d="M5 12h14"/>`,
  'target': `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>`,
  'close': `<path d="M18 6L6 18M6 6l12 12"/>`,
  'lock': `<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>`,
  'book': `<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>`,
  'bell': `<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`,
  'user': `<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>`,
  'sparkle': `<path d="M12 3l1.6 4.9L18 9.5l-4.4 1.6L12 16l-1.6-4.9L6 9.5l4.4-1.6L12 3z"/>`,
  'refresh': `<path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/>`,
  'node-brain': `<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5.2V18a3 3 0 003 3 3 3 0 003-2.2M9 4a3 3 0 013 2v13.8M9 4c.6-1.2 1.8-2 3-2M15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5.2V18a3 3 0 01-3 3 3 3 0 01-3-2.2M15 4c-.6-1.2-1.8-2-3-2"/>`,
  'node-brainstem': `<path d="M12 3v6"/><ellipse cx="12" cy="13" rx="5" ry="7"/><path d="M9 20l-1.5 2M15 20l1.5 2M12 19v3"/>`,
  'node-reward': `<path d="M12 21s-7.5-4.6-9.7-9.1C.6 8.4 2.2 5 5.6 5c1.9 0 3.4 1 4.4 2.5C11 6 12.5 5 14.4 5c3.4 0 5 3.4 3.3 6.9C19.5 16.4 12 21 12 21z"/>`,
  'node-gut': `<path d="M6 4c0 3 3 3 3 6s-3 3-3 6 3 3 3 6"/><path d="M14 4c0 2 2.5 2.5 2.5 5.5S14 13 14 16s2.5 2.5 2.5 4"/>`,
  'node-pancreas': `<path d="M4 9c2-2 5-3 8-2.5 3 .4 6 1 7.5 3.5.8 1.3-.2 3-1.8 3-2.8 0-3.2-2-6-2-2 0-3 1.4-5 1.8C4.7 13 3 12 3 10.4 3 9.8 3.4 9.4 4 9z"/><circle cx="8" cy="9.5" r="0.8" fill="currentColor" stroke="none"/>`,
  'node-genetic': `<path d="M7 3c0 4 10 4 10 8s-10 4-10 8M17 3c0 4-10 4-10 8s10 4 10 8"/><path d="M8 6h8M7.3 9.5h9.4M7.3 14.5h9.4M8 18h8"/>`,
  'node-adipose': `<path d="M12 2C8 8 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-7-7-13z"/>`,
  'node-energy': `<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>`,
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.viewBox]="'0 0 24 24'"
      [style.width.px]="size"
      [style.height.px]="size"
      fill="none"
      [attr.stroke]="stroke"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      [innerHTML]="path"
    ></svg>
  `,
})
export class IconComponent {
  @Input() name = 'logo';
  @Input() size = 20;
  @Input() stroke = 'currentColor';

  get path(): string {
    return ICONS[this.name] ?? '';
  }
}
