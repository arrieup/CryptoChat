import { User } from "./user.model";

export class Message {
    public Id : string;
    public Sender : User;
    public Content : string;


    public constructor (id? : string, sender? : User, content? : string) {
        this.Id = id  != undefined ? id :"";
        this.Sender = sender != undefined ? sender : new User();
        this.Content = content != undefined ? content : "";
    }

}
