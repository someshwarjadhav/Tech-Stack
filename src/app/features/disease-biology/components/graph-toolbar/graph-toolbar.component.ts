import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphService, ExploreMode } from '../../graph.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-graph-toolbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './graph-toolbar.component.html',
})
export class GraphToolbarComponent {
  constructor(public graphService: GraphService) {}

  onModeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as ExploreMode;
    this.graphService.setExploreMode(value);
  }
}
