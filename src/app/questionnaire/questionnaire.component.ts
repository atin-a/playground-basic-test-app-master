import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApiService } from '../../app/services/api-service.service';
import { Items, Questionnaire } from '../shared/questionnaire';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaire: Questionnaire;
  form: FormGroup;
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private apiService: ApiService) {
    this.apiService.getQuestionnaire().subscribe(data => {
      this.questionnaire = data;
      this.form = new FormGroup({});
      this.model = data;
      const items: Items[] = this.questionnaire.item;
      this.fields = [{
        type: 'stepper',
        fieldGroup: [
          {
            templateOptions: { label: items[0].linkId + '  ' + items[0].text },
            fieldGroup: [
              {
                key: items[0].linkId,
                type: 'radio',
                templateOptions: {
                  label: items[0].linkId + '  ' + items[0].text,
                  required: true,
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]
                }
              }
            ]
          },
          {
            templateOptions: { label: items[1].linkId + '  ' + items[1].text },
            fieldGroup: [
              {
                key: items[1].item[0].linkId,
                type: 'select',
                templateOptions: {
                  label: items[1].item[0].linkId + '  ' + items[1].item[0].text,
                  required: true,
                  options: [
                    { value: 'transgender-female', label: 'transgender female' },
                    { value: 'transgender-male', label: 'transgender male' },
                    { value: 'non-binary', label: 'non-binary' },
                    { value: 'male', label: 'male' },
                    { value: 'female', label: 'female' },
                    { value: 'other', label: 'other' },
                    { value: 'non-disclose', label: 'does not wish to disclose' },
                  ]
                }
              },
              {
                key: items[1].item[1].linkId,
                type: 'datepicker',
                templateOptions: {
                  label: items[1].item[1].linkId + '  ' + items[1].item[1].text,
                  required: true,
                }
              },
              {
                key: items[1].item[2].linkId,
                type: 'input',
                templateOptions: {
                  label: items[1].item[2].linkId + '  ' + items[1].item[2].text,
                  required: true,
                }
              },
              {
                key: items[1].item[3].linkId,
                type: 'select',
                templateOptions: {
                  label: items[1].item[3].linkId + '  ' + items[1].item[3].text,
                  required: true,
                  options: [
                    { value: 'A', label: 'Annulled' },
                    { value: 'D', label: 'Divorced' },
                    { value: 'I', label: 'Interlocutory' },
                    { value: 'L', label: 'Legally Separated	' },
                    { value: 'M', label: 'Married' },
                    { value: 'P', label: 'Polygamous' },
                    { value: 'S', label: 'Never Married' },
                    { value: 'T', label: 'Domestic partner' },
                    { value: 'U', label: 'Unmarried' },
                    { value: 'W', label: 'Widowed' },
                    { value: 'UNK', label: 'Unknown' },
                  ]
                }
              },
            ]
          },
          {
            templateOptions: { label: items[2].linkId + '  ' + items[2].text },
            fieldGroup: [
              {
                key: items[2].item[0].linkId,
                type: 'radio',
                templateOptions: {
                  label: items[2].item[0].linkId + '  ' + items[2].item[0].text,
                  required: true,
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]
                }
              },
              {
                key: items[2].item[1].linkId,
                type: 'radio',
                templateOptions: {
                  label: items[2].item[1].linkId + '  ' + items[2].item[1].text,
                  required: true,
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]
                }
              }
            ]
          }
        ]
      }];
    });
  }

  ngOnInit(): void {
  }

  onSubmit({ valid, value }) {
    debugger;
    console.log(value);
    console.log(valid);
  }

}
