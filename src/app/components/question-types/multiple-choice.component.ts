import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-multiple-choice',
  template: `
    <!-- <div
      *ngFor="let option of options"
      class="option"
      [class.selected]="selectedAnswer === option"
      (click)="selectAnswer(option)"
    >
      {{ option }}
    </div> -->

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
export class MultipleChoiceComponent {
  @Input() options: string[] = [];
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
