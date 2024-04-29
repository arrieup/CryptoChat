export class User {
    public Username : string;
    public Password : string;
    public Email : string;

    public constructor (username? : string, password? : string, email? : string) {
        this.Username = username != undefined ? username : "";
        this.Password = password != undefined ? password : "";
        this.Email = email != undefined ? email : "";
    }
}
