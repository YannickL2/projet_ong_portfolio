import IBaseArticle from "../interfaces/base_article.interface";


export class AccomplishmentModel implements IBaseArticle{
    
    title!: string;
    content!: string;
    isVisible!: boolean;
    creation_date!: Date;
    modified_date!: Date;
    visibleUntil!: Date;
    image!: string;
    location!: string;
}
