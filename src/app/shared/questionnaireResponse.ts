import { Time } from "@angular/common";
import { Url } from "url";

export class questionnaireResponse {
    resourceType: string;
    id: string;
    identifier?: string;
    url?: string;
    status: string;
    subject?: {
        reference?: string,
        display?: string
    };
    authored?: string;
    author?: {
        reference?: string
    }
    source?: {
        reference?: string
    };
    item: responseItems[];

    constructor(options: {
        resourceType?: string;
        id?: string;
        identifier?: string;
        url?: string;
        status?: string;
        subject?: {
            reference?: string,
            display?: string
        };
        authored?: string;
        author?: {
            reference?: string
        }
        source?: {
            reference?: string
        };
        item?: responseItems[];
    } = {}) {
        this.resourceType = options.resourceType;
        this.id = options.id;
        this.identifier = options.identifier;
        this.url = options.url;
        this.status = options.status;
        this.subject = options.subject;
        this.author = options.author;
        this.authored = options.authored;
        this.source = options.source;
        this.item = options.item;
    }
}

export class responseItems {
    linkId: string;
    text: string;
    definition?: Url;
    item?: responseItems[];
    answer?: {
        valueBoolean?: boolean;
        valueDecimal?: number;
        valueDate?: Date;
        valueDateTime?: Date;
        valueTime?: Time;
        valueString?: string;
        valueUri?: Url;
        item?: responseItems[];
    };
    constructor(options: {
        linkId?: string;
        text?: string;
        definitions?: Url;
        item?: responseItems[];
        answer?: {};
    } = {}) {
        this.linkId = options.linkId;
        this.text = options.text;
        this.item = options.item;
        this.answer = options.answer;
    }
}