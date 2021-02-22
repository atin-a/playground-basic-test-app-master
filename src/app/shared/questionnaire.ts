
export class Questionnaire {
    resourceType: string;
    id: string;
    url: string;
    status: string;
    subjectType: string[];
    date: string;
    item: Items[];
}

export class Items {
    linkId: string;
    text: string;
    type?: string;
    item?: Items[];
}

