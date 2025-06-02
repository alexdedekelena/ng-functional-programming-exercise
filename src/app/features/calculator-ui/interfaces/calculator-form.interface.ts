import { FormControl } from '@angular/forms';

export interface CalculatorForm {
  expression: FormControl<string | null>;
}
