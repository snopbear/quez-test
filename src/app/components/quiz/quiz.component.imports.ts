
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
const common = [ NgIf, NgFor];
const module = [FormsModule];


const quizComponentImports = [...common,...module];

export default quizComponentImports;
