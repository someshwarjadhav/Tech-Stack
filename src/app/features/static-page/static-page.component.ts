import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-static-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './static-page.component.html',
})
export class StaticPageComponent {}
