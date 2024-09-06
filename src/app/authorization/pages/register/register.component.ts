import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MESSAGE_MODAL } from '../../../shared/utils/constant';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { AuthorizationServiceForm } from '../../infraestructure/form-service/authorization-form.service';
import AuthorizationUseCases from '../../domain/usecase/authorization-use-case';
import { EResult } from '../../../shared/enums/EResult';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent, AlertComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  @ViewChild('DataTreatment') DataTreatment!: ModalComponent;
  @ViewChild('termsAndConditions') termsAndConditions!: ModalComponent;
  @ViewChild('alert') alert!: AlertComponent;

  isTermsChecked: boolean = false;
  isDataChecked: boolean = false;
  isTermsModalOpen: boolean = false;
  isDataModalOpen: boolean = false;
  matchPassword: boolean = false;

  alertMessage: string | null = null;
  isAlertVisible: boolean = true;

  alertType: 'success' | 'error' | 'info' = 'info';
  registrationForm!: UntypedFormGroup;

  passwordFieldType: string = 'password'
  confirmPasswordFieldType: string = 'password';

  message: string = MESSAGE_MODAL

  constructor(
      private formService: AuthorizationServiceForm,
      private authorizationUseCases: AuthorizationUseCases,
      private router: Router
    ) {}

  ngOnInit() {
    this.registrationForm = this.formService.registrationForm();
  }

  Passwordcoincide() {
    setTimeout(() => {
      if (this.registrationForm.get('password')?.value == this.registrationForm.get('repeatPassword')?.value) {
        this.matchPassword = false;
      }
      else {
        this.matchPassword = true;
      }
    }, 1000);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  isFormInvalid(): boolean {
    return this.registrationForm.invalid
  }
  
  onSubmit(): void {
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.termConditions && this.registrationForm.value.dataTreatment) {
        const company: any = this.registrationForm.value;

        this.authorizationUseCases.register(company).subscribe(response => {
          if (response.result == EResult.Success) {
            console.log(response)
          } 
          else if(response.result == EResult.Error) {
            console.log(response)
          }
        })

      } else {
        this.alert.showMessages('Debes llenar todos los campos. Aceptar tratamiento de datos y términos y condiciones de la plataforma.', 'error');
      }
    }
  }


  onTermsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.termsAndConditions.openModal()
    } else {
      this.registrationForm.patchValue({ termConditions: false });
    }
  }

  onDataChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.DataTreatment.openModal()
    } else {
      this.registrationForm.patchValue({ dataTreatment: false });
    }
  }

  acceptTerms() {
    this.registrationForm.patchValue({ termConditions: true, });
    this.termsAndConditions.closeModal()
  }

  acceptData() {
    this.registrationForm.patchValue({ dataTreatment: true });
    this.DataTreatment.closeModal()
  }

}
