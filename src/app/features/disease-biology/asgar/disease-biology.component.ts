import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphToolbarComponent } from '../components/graph-toolbar/graph-toolbar.component';
import { GraphCanvasComponent } from './graph-canvas/graph-canvas.component';
import { NodeDetailPanelComponent } from './node-detail-panel/node-detail-panel.component';

@Component({
  selector: 'app-disease-biology',
  standalone: true,
  imports: [CommonModule, GraphToolbarComponent, GraphCanvasComponent, NodeDetailPanelComponent],
  templateUrl: './disease-biology.component.html',
})
export class DiseaseBiologyComponent {}
