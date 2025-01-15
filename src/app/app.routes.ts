import { Routes } from '@angular/router';
import { CategorySelectionComponent } from './components/category-selection/category-selection.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import(
        './components/category-selection/category-selection.component'
      ).then((x) => x.CategorySelectionComponent),
  },
  {
    path: 'quiz/:category',
    loadComponent: () =>
      import('./components/quiz/quiz.component').then((x) => x.QuizComponent),
  },
];
