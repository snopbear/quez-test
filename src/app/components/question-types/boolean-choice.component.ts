import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  standalone: true,
})
export class BooleanChoiceComponent {
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
