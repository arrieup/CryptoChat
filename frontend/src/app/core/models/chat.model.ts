import { Message } from "./message.model";
import { User } from "./user.model";

export class Chat {
    private Id : string;
    public Name : string;
    public Password : string;
    public Creator : string;
    public Members : Array<User>;
    public Messages : Array<Message>;

    public constructor (id : string, name : string, password : string, creator : string, members : Array<User>, messages : Array<Message>) {
        this.Id = id;
        this.Name = name;
        this.Password = password;
        this.Creator = creator;
        this.Members = members;
        this.Messages = messages;
    }

    public AddMessage(message : Message) {
        this.Messages.push(message);
    }

}
