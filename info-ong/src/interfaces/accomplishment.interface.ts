import { UUID } from "crypto";
import IBaseArticle from "./base_article.interface";


export default interface IAccomplishment extends IBaseArticle{
    location: string
}

