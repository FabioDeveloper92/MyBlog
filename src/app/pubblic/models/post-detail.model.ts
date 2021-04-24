export class PostDetail {
    public id : string;
    public title: string;
    public category: number;
    public imageUrl: string;
    public date: Date;
    public createdBy: string;
    public comments: Comment[];
    public text: string;
}