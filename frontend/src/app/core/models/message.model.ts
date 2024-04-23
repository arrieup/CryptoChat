import { User } from "./user.model";

export class Message {
    private Id : string;
    public Sender : User;
    public Content : string;

    public constructor (id : string, sender : User, content : string) {
        this.Id = id;
        this.Sender = sender;
        this.Content = content;
    }

}
