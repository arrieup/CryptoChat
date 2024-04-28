import { Message } from "./message.model";
import { User } from "./user.model";

export class Chat {
    public Id : string;
    public Name : string;
    public Password : string;
    public Creator : User;
    public Members : Array<User>;
    public Messages : Array<Message>;


    public constructor (id? : string, name? : string, password? : string, creator? : User, members? : Array<User>, messages? : Array<Message>) {
        this.Id = id != undefined ? id : "";
        this.Name = name != undefined ? name : "";
        this.Password = password != undefined ? password : "";
        this.Creator = creator != undefined ? creator : new User();
        this.Members = members != undefined ? members : new Array<User>();
        this.Messages = messages != undefined ? messages : new Array<Message>();
    }

    public AddMessages(messages : Array<Message>) {
        messages.forEach(msg => {
            this.Messages.push(msg);
            console.log(msg);
        });
    }

    public GetMessages() : Array<Message>{
        return this.Messages;
    }
    public SetMessages(messages : Array<Message>){
        this.Messages = messages;
    }

}
