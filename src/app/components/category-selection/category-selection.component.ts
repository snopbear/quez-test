import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Category, Question } from '../../models/question.model';
import categorySelectionComponentImports from './category-selection.component.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css'],
  standalone: true,
  imports: [categorySelectionComponentImports],
})
export class CategorySelectionComponent {
  categories: string[] = []; // Array of unique category names
  selectedCategory: string | null = null;
  selectedDifficulty: string = 'all'; // Default difficulty

  constructor(private quizService: QuizService, private router: Router) {
    this.categories = this.quizService.getCategories(); // Get unique categories
  }

  // Start the quiz
  startQuiz() {
    if (this.selectedCategory && this.selectedDifficulty) {
      this.router.navigate(['/quiz', this.selectedCategory], {
        queryParams: { difficulty: this.selectedDifficulty },
      });
    }
  }
}
