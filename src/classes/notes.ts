import { v4 as uuidv4 } from 'uuid';

class Note {
    public id: string;
    public title: string;
    public description: string;

    constructor(title: string, description: string){
        this.id = uuidv4();
        this.title = title;
        this.description = description;
    }
}

export default Note;