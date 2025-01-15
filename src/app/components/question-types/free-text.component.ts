import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-free-text',
  template: `
    <input
      type="text"
      [(ngModel)]="freeTextAnswer"
      placeholder="Type your answer here"
    />
    <button (click)="selectAnswer(freeTextAnswer)">Submit</button>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class FreeTextComponent {
  @Input() freeTextAnswer: string = '';
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
