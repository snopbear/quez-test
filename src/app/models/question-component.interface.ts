import { EventEmitter } from "@angular/core";

export interface QuestionComponent {
  selectedAnswer: string | null;
  answerSelected: EventEmitter<string>;
}
