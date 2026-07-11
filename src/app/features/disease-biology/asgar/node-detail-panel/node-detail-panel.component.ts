import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphService, CATEGORY_COLORS } from '../../graph.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-node-detail-panel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './node-detail-panel.component.html',
})
export class NodeDetailPanelComponent {
  colors = CATEGORY_COLORS;
  constructor(public graphService: GraphService) {}
}
