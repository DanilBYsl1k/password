import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
          return null;
      }

      const hasNumeric = /[0-9]+/.test(value);
      const hasLowerCase = /[a-zA-Z]/.test(value);
      const hasSymbols = /[^a-zA-Z0-9\s]/.test(value)

      const passwordValid =  hasLowerCase && hasNumeric && hasSymbols;
      console.log(control)
      
      if(!passwordValid) {
        console.log(passwordValid)
        return { hasLowerCase, hasNumeric, hasSymbols };
      }else {
        return null
      }
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  password = new FormControl<string | null>('', [
    Validators.required,
    Validators.minLength(8), 
    createPasswordStrengthValidator()
  ])
}
