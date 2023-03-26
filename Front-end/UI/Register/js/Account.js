export class Account {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    toString() {
        return  "?&Name=" + this.name+"&Email=" + this.email+"&password=" +this.password;
    }
}
