import { v4 as uuidv4 } from 'uuid';
import Notes from './notes';

class User {
    public id: string;
    public userName: string;
    public password: string;
    public notes: Array<Notes>;

    constructor(userName: string, password: string){
        this.id = uuidv4();
        this.userName = userName;
        this.password = password;
        this.notes = [];
    }
}

export default User;