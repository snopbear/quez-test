import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { QuestionComponent } from '../../models/question-component.interface';

@Component({
  selector: 'app-free-text',
  standalone: true, // Mark the component as standalone
  imports: [FormsModule], // Import FormsModule here
  template: `
    <input
      type="text"
      [(ngModel)]="freeTextAnswer"
      placeholder="Type your answer here"
    />
    <button (click)="selectAnswer(freeTextAnswer)">Submit</button>
  `,
})
export class FreeTextComponent implements QuestionComponent {
  @Input() freeTextAnswer: string = '';
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
