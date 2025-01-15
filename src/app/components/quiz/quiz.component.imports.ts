
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';

const common = [NgSwitch, NgIf, NgFor, NgSwitchCase];
const module = [FormsModule];

const quizComponentImports = [...common,...module];

export default quizComponentImports;
