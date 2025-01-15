import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';
import quizComponentImports from './quiz.component.imports';
import { ActivatedRoute } from '@angular/router';
import { MultipleChoiceComponent } from '../question-types/multiple-choice.component';
import { BooleanChoiceComponent } from '../question-types/boolean-choice.component';
import { FreeTextComponent } from '../question-types/free-text.component';
import { QuestionComponent } from '../../models/question-component.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [quizComponentImports],
})
export class QuizComponent {
  questions: Question[] = [];
  currentIndex = 0;
  currentQuestion: Question | null = null;
  selectedAnswer: string | null = null;
  freeTextAnswer = '';
  showResults = false;
  score = 0;
  userAnswers: { question: Question; answer: string }[] = [];
  progress: number = 0;

  @ViewChild('questionContainer', { read: ViewContainerRef })
  questionContainer!: ViewContainerRef;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
      const category = params['category'];
      const difficulty = this.route.snapshot.queryParams['difficulty'] || 'all';
      this.questions = this.quizService.getQuestionsByCategoryAndDifficulty(
        category,
        difficulty
      );
      this.updateProgress();
      this.loadQuestion();
    });
  }

  loadQuestion() {
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedAnswer = null;
    this.freeTextAnswer = '';
    this.renderQuestionComponent();
  }

  renderQuestionComponent() {
    // Clear the container before rendering a new component
    this.questionContainer.clear();

    let component: any;
    switch (this.currentQuestion?.type) {
      case 'multiple':
        component = MultipleChoiceComponent;
        break;
      case 'boolean':
        component = BooleanChoiceComponent;
        break;
      case 'freetext':
        component = FreeTextComponent;
        break;
      default:
        return;
    }

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef =
      this.questionContainer.createComponent(componentFactory);

    // Type-cast the instance to QuestionComponent
    const questionComponent = componentRef.instance as QuestionComponent;

    // Set common properties
    questionComponent.selectedAnswer = this.selectedAnswer;

    // Set specific properties based on the question type
    if (this.currentQuestion?.type === 'multiple') {
      (questionComponent as MultipleChoiceComponent).options =
        this.getOptions();
    } else if (this.currentQuestion?.type === 'freetext') {
      (questionComponent as FreeTextComponent).freeTextAnswer =
        this.freeTextAnswer;
    }

    // Listen for output events
    questionComponent.answerSelected.subscribe((answer: string) => {
      this.selectAnswer(answer);
    });
  }

  getOptions(): string[] {
    if (this.currentQuestion?.type === 'multiple') {
      return [
        ...(this.currentQuestion.incorrect_answers || []),
        this.currentQuestion.correct_answer,
      ].sort();
    }
    return [];
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;

    if (this.currentQuestion) {
      this.userAnswers.push({
        question: this.currentQuestion,
        answer: answer,
      });
    }
  }

  nextQuestion() {
    if (this.selectedAnswer) {
      this.currentIndex++;
      this.updateProgress();
      if (this.currentIndex < this.questions.length) {
        this.loadQuestion();
      } else {
        this.showResults = true;
        this.score = this.quizService.calculateScore(this.userAnswers);
      }
    }
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateProgress();
      this.loadQuestion();
    }
  }

  updateProgress() {
    this.progress = ((this.currentIndex + 1) / this.questions.length) * 100;
  }
}
