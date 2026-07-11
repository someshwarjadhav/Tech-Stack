import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { DiseaseBiologyComponent } from './features/disease-biology/asgar/disease-biology.component';
import { StaticPageComponent } from './features/static-page/static-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'obesity/disease-biology', pathMatch: 'full' },
      { path: 'obesity/disease-biology', component: DiseaseBiologyComponent },
   
      
      {
        path: 'obesity/gayatri',
        loadComponent: () =>
          import('./features/disease-biology/gayatri/gayatri.component').then(
            (m) => m.GayatriComponent,
          ),
      },
      {
        path: 'obesity/muskan',
        loadComponent: () =>
          import('./features/disease-biology/muskan/muskan.component').then(
            (m) => m.MuskanComponent,
          ),
      },
      { path: 'obesity/epidemiology', component: StaticPageComponent },
      { path: 'obesity/clinical-results', component: StaticPageComponent },
      { path: 'obesity/pipeline', component: StaticPageComponent },
      { path: 'obesity/simulator', component: StaticPageComponent },
      { path: '**', redirectTo: 'obesity/disease-biology' },
    ],
  },
];
