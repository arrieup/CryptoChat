export class User {
    public Username : string;
    public Password : string;

    public constructor (username? : string, password? : string) {
        this.Username = username != undefined ? username : "";
        this.Password = password != undefined ? password : "";
    }
}
