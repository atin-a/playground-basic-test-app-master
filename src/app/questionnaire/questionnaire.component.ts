import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApiService } from '../../app/services/api-service.service';
import { Items, Questionnaire } from '../shared/questionnaire';
import { questionnaireResponse, responseItems } from '../shared/questionnaireResponse';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaire: Questionnaire;
  response: questionnaireResponse;
  displayResponse = null;
  form: FormGroup;
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private apiService: ApiService) {
    this.apiService.getQuestionnaire().subscribe(data => {
      this.questionnaire = data;
      this.form = new FormGroup({});
      this.model = { 1: true, 2.1: 'male', 2.2: new Date(1987, 4, 21), 2.3: 'Iran', 2.4: 'D', 3.1: true, 3.2: true };
      const items: Items[] = data.item;
      this.fields = [{
        type: 'stepper',
        fieldGroup: [
          {
            templateOptions: { label: items[0].linkId + '  Allergies' },
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
              {
                className: 'flex-6',
                key: parseFloat(items[0].linkId),
                type: 'radio',
                templateOptions: {
                  label: items[0].linkId + '  ' + items[0].text,
                  required: true,
                  options: [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ]
                }
              }
            ]
          },
          {
            templateOptions: { label: items[1].linkId + '  ' + items[1].text },
            fieldGroup: [
              // { key: parseFloat(items[1].linkId) },
              {
                fieldGroupClassName: 'display-flex',
                fieldGroup: [
                  {
                    className: 'flex-3',
                    key: parseFloat(items[1].item[0].linkId),
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
                    className: 'flex-3',
                    key: parseFloat(items[1].item[1].linkId),
                    type: 'datepicker',
                    templateOptions: {
                      label: items[1].item[1].linkId + '  ' + items[1].item[1].text,
                      required: true,
                      datepickerOptions: {
                        startView: 'multi-year',
                        startAt: new Date(1990, 0, 1),
                        touchUi: true
                      }
                    }
                  },
                ]
              },
              {
                fieldGroupClassName: 'display-flex',
                fieldGroup: [
                  {
                    className: 'flex-3',
                    key: parseFloat(items[1].item[2].linkId),
                    type: 'input',
                    templateOptions: {
                      label: items[1].item[2].linkId + '  ' + items[1].item[2].text,
                      required: true,
                    }
                  },
                  {
                    className: 'flex-3',
                    key: parseFloat(items[1].item[3].linkId),
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
              }
            ]
          },
          {
            templateOptions: { label: items[2].linkId + '  ' + items[2].text },
            fieldGroup: [
              // { key: parseFloat(items[2].linkId) },
              {
                key: parseFloat(items[2].item[0].linkId),
                type: 'radio',
                templateOptions: {
                  label: items[2].item[0].linkId + '  ' + items[2].item[0].text,
                  required: true,
                  options: [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ]
                }
              },
              {
                key: parseFloat(items[2].item[1].linkId),
                type: 'radio',
                templateOptions: {
                  label: items[2].item[1].linkId + '  ' + items[2].item[1].text,
                  required: true,
                  options: [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
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
    if (valid) {
      this.generateQuestionnaireResponse(value);
    }
  }

  generateQuestionnaireResponse(model) {
    const patient = 'Patient/f201';
    const practitioner = "Practitioner/f201";
    this.response = new questionnaireResponse({
      resourceType: 'QuestionnaireResponse',
      id: this.questionnaire.id,
      identifier: this.questionnaire.id,
      url: this.questionnaire.url,
      subject: { display: 'Roel', reference: patient },
      authored: new Date().toLocaleString(),
      author: { reference: practitioner },
      source: { reference: practitioner },
      status: 'completed'
    });
    this.response.item = this.questionnaire.item;
    this.response.item.map((item, index) => {
      item.answer = model[item.linkId];
      if (item.item) {
        item.item.map(x => x.answer = model[x.linkId]);
      }
    });
    this.displayResponse = JSON.stringify(this.response);
  }

}
