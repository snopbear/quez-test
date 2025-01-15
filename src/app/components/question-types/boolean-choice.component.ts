import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionComponent } from '../../models/question-component.interface';

@Component({
  selector: 'app-boolean-choice',
  template: `
    <div
      class="option"
      [class.selected]="selectedAnswer === 'True'"
      (click)="selectAnswer('True')"
    >
      True
    </div>
    <div
      class="option"
      [class.selected]="selectedAnswer === 'False'"
      (click)="selectAnswer('False')"
    >
      False
    </div>
  `,
})
export class BooleanChoiceComponent implements QuestionComponent {
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}