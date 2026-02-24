// import { UUID } from 'crypto';


export default interface IBaseArticle {
    title: string
    content: string
    isVisible: boolean
    creation_date: Date
    modified_date: Date
    visibleUntil: Date
    image: string
}

