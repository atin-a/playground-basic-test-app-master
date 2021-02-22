import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-stepper',
  templateUrl: './formly-stepper.component.html',
  styleUrls: ['./formly-stepper.component.scss']
})
export class FormlyStepperComponent extends FieldType {
  isValid(field: FormlyFieldConfig) {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup.every(f => this.isValid(f));
  }
}
