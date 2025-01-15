import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';
import quizComponentImports from './quiz.component.imports';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [quizComponentImports],
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentIndex = 0;
  currentQuestion: Question | null = null;
  selectedAnswer: string | null = null;
  freeTextAnswer = '';
  showResults = false;
  score = 0;
  userAnswers: { question: Question; answer: string }[] = []; // Store user's answers
  progress: number = 0; // Track progress as a percentage

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the selected category and difficulty from the route
    this.route.params.subscribe((params) => {
      const category = params['category'];
      const difficulty = this.route.snapshot.queryParams['difficulty'] || 'all';
      this.questions = this.quizService.getQuestionsByCategoryAndDifficulty(
        category,
        difficulty
      );
      this.updateProgress(); // Initialize progress
      this.loadQuestion();
    });
  }

  // Load the current question
  loadQuestion() {
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedAnswer = null;
    this.freeTextAnswer = '';
  }

  // Get options for multiple-choice questions
  getOptions(): string[] {
    if (this.currentQuestion?.type === 'multiple') {
      return [
        ...(this.currentQuestion.incorrect_answers || []),
        this.currentQuestion.correct_answer,
      ].sort();
    }
    return [];
  }

  // Select an answer
  selectAnswer(answer: string) {
    this.selectedAnswer = answer;

    // Save the user's answer
    if (this.currentQuestion) {
      this.userAnswers.push({
        question: this.currentQuestion,
        answer: answer,
      });
    }
  }

  // Navigate to the next question
  nextQuestion() {
    if (this.selectedAnswer) {
      this.currentIndex++;
      this.updateProgress(); // Update progress after moving to the next question
      if (this.currentIndex < this.questions.length) {
        this.loadQuestion();
      } else {
        this.showResults = true;
        this.score = this.quizService.calculateScore(this.userAnswers); // Pass the user's answers
      }
    }
  }

  // Navigate to the previous question
  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateProgress(); // Update progress after moving to the previous question
      this.loadQuestion();
    }
  }

  // Update progress as a percentage
  updateProgress() {
    this.progress = ((this.currentIndex + 1) / this.questions.length) * 100;
  }
}
