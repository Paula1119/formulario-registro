import { AbstractControl, ValidatorFn, ValidationErrors, } from "@angular/forms";

export class CValidators {

  static MaxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (length > maxLength) {
        control.setValue(control.value.slice(0, maxLength));
      }
      return null;
    };
  }

  static Numeric(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.toString().replace(/[^0-9]*/g, ''));
    }
    return null;
  }

  static phonemobileValidator(number: any): any {
    if (number.pristine) {
      return null;
    }
    const PHONE_REGEXP = /3[0-9]{9}/;
    number.markAsTouched();
    if (PHONE_REGEXP.test(number.value)) {
      return null;
    }
    return {
      invalidNumber: true,
    };
  }

  static emailPatternValidatorSeparatedBySemicolon(email: any): any {
    if (email.pristine) {
      return null;
    }

    if (!email.value) {
      return null;
    }

    const EMAIL_REGEXP = /^([\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})(;[\w+-.%]+@[\w.-]+\.[A-Za-z]{2,4})*$/;
    email.markAsTouched();

    if (EMAIL_REGEXP.test(email.value)) {
      return null;
    }
    return {
      invalidEmail: true,
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {

        return this;
      }

      const valid = regex.test(control.value);

      return valid ? this : error;
    };
  }

}
