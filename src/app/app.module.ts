import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { FormlyFieldStepper } from './questionnaire/stepper.type';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    FormlyFieldStepper
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule, MatButtonModule, MatStepperModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ]
    }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule, MatNativeDateModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
