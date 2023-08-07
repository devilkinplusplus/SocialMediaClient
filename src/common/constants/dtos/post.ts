import { User } from "./user";

export class Post {
    id:string;
    userId:string;
    user:User;
    content:string;
    files:string[];
    likes:number;
    isLiked:boolean;
    date:Date;    
}