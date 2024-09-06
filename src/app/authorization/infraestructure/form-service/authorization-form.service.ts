import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CValidators } from '../../../shared/validators/validators';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceForm {

  constructor(private formBuilder: UntypedFormBuilder) { }

  registrationForm() {
    return this.formBuilder.group({
      NIT: [
        '',
        [
          Validators.required,
          CValidators.Numeric,
          CValidators.MaxLength(9)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          CValidators.emailPatternValidatorSeparatedBySemicolon
        ]
      ],
      mobile: [
        '',
        [
          Validators.required,
          CValidators.Numeric,
          CValidators.MaxLength(10),
          CValidators.phonemobileValidator,
          Validators.minLength(10)
        ]
      ],
      password: [null, Validators.compose([
        Validators.required,
        CValidators.patternValidator(/\d/, { hasNumber: true }),
        CValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CValidators.patternValidator(/(?=.[!#$%&*.,_¿?\?@])/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
        CValidators.MaxLength(15)
      ])
      ],
      repeatPassword: [null, Validators.compose([
        Validators.required,
        CValidators.patternValidator(/\d/, { hasNumber: true }),
        CValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CValidators.patternValidator(/(?=.[!#$%&*.,_¿?\/?@])/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
        CValidators.MaxLength(15)
      ])
      ],
      termConditions: [
        '',
        [
        ]
      ],
      dataTreatment: [
        '',
        [
        ]
      ],
    });
  }
}
