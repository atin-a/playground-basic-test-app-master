import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-stepper',
    template: `
  <mat-horizontal-stepper>
    <mat-step
      *ngFor="let step of field.fieldGroup; let index = index; let last = last;">
      <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
      <formly-field [field]="step"></formly-field>

      <div class="button-row">
        <button matStepperPrevious *ngIf="index !== 0"
        mat-stroked-button
          type="button">
          Back
        </button>

        <button matStepperNext *ngIf="!last"
        mat-stroked-button
          [disabled]="!isValid(step)">
          Next
        </button>

        <button *ngIf="last" type="reset" mat-stroked-button color="warn">Clear</button>
        <button *ngIf="last" type="submit" [disabled]="!form.valid" mat-raised-button color="primary">Submit</button>
        
      </div>
    </mat-step>
  </mat-horizontal-stepper>
`,
})
export class FormlyFieldStepper extends FieldType {
    isValid(field: FormlyFieldConfig) {
        if (field.key) {
            return field.formControl.valid;
        }

        return field.fieldGroup.every(f => this.isValid(f));
    }
}
