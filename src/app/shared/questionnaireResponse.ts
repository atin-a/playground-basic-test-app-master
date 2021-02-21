import { Time } from "@angular/common";
import { Url } from "url";
import { Questionnaire, Items } from "./questionnaire";

export class questionnaireResponse extends Questionnaire {
    identifier: string;

}

export class responseItems extends Items {
    definition: Url;
    answer: any[];

}