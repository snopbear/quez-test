import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionComponent } from '../../models/question-component.interface';

@Component({
  selector: 'app-multiple-choice',
  template: `
    @for(option of options;track option){
     <div
       class="option"
       [class.selected]="selectedAnswer === option"
       (click)="selectAnswer(option)"
     >
       {{ option }}
     </div>
     }
  `,
  standalone: true,
})
export class MultipleChoiceComponent implements QuestionComponent {
  @Input() options: string[] = [];
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}