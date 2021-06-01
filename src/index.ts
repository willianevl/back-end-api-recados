import express, {Request, Response} from 'express';
import Note from './classes/notes';
import User from './classes/user';
import listOfUsers from './data';
import NoteInterface from './interfaces/notes';
import UserInterface from './interfaces/userInterface';
import verifyPasswords from './middleware/md-password';
import userAlreadyExists from './middleware/md-UserAlreadyExists';
import verifyUserName from './middleware/md-username';
import verifyEqualPasswords from './middleware/md-verifyEqualPasswords';
import verifyNoteContent from './middleware/md-verifyNoteContent';

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor Rodando')
});

app.get('/', (req: Request, res: Response) => {
    res.send('API')
}); 

app.post("/users", verifyUserName, verifyPasswords, verifyEqualPasswords, userAlreadyExists, (req: Request, res: Response) => {
    const { userName, password, verifyPassword }: UserInterface = req.body;

    const newUser = new User(userName, password);
    listOfUsers.push(newUser);

    return res.status(201).json({
        success: true,
        data: newUser
    });
});

app.get("/users", (req: Request, res: Response) => {
    return res.status(200).json({
        success:true,
        data: listOfUsers
    });
});

app.get("/users/:id", (req: Request, res: Response) => {
    const { id }: { id?: string} = req.params;

    const user = listOfUsers.find((f) => f.id === id);
    if (!user) {
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    return res.status(200).json({
        succes: true,
        data: user
    });
});

app.put('/users/:id', verifyUserName, verifyPasswords, verifyEqualPasswords, 
userAlreadyExists, (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    const { userName, password, verifyPassword }: UserInterface = req.body;

    const user = listOfUsers.find((f) => f.id === id);
    if(!user) {
        return  res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    user.userName = userName;
    user.password = password;

    return res.status(200).json({
        success: true,
        data: user
    });
});

app.delete("/users/:id", (req: Request, res: Response) => {
    const { id }: { id?: string } = req.params;
    
    const userIndex = listOfUsers.findIndex((f) => f.id === id);
    if(userIndex === -1){
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    const removedUser = listOfUsers.splice(userIndex, 1);

    return res.status(200).json({
        removedUser: removedUser
    });
});

app.post("/users/:userID/notes", verifyNoteContent, (req: Request, res: Response) => {
    const { userID }: { userID?: string } = req.params;
    const { title, description }: NoteInterface = req.body;

    const user = listOfUsers.find((f) => f.id === userID);
    if(!user){
        res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    user?.notes.push(new Note(title, description));

    return res.status(201).json({
        success: true,
        data: user?.notes
    });
});

app.get("/users/:userID/notes", (req: Request, res: Response) => {
    const { userID }: { userID?: string } = req.params;

    const user = listOfUsers.find((f) => f.id === userID);
    if(!user) {
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    return res.status(200).json({
        success: true,
        data: user.notes
    });
});

app.get("/users/:userID/notes/:id", (req: Request, res: Response) => {
    const { userID, id }: { userID?: string, id?: string } = req.params;

    const user = listOfUsers.find((f) => f.id === userID);
    if(!user) {
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    const note = user.notes.find((f) => f.id === id);
    if(!note) {
        return res.status(404).json({
            msg: 'Recado não encontrado'
        });
    }

    return res.status(200).json({
        success: true,
        data: note
    });
});

app.put("/users/:userID/notes/:id", verifyNoteContent, (req: Request, res: Response) => {
    const { userID, id }: { userID?: string, id?: string } = req.params;
    const { title, description }: NoteInterface = req.body;

    const user = listOfUsers.find((f) => f.id === userID);
    if(!user) {
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    const note = user.notes.find((f) => f.id === id);
    if(!note) {
        return res.status(404).json({
            msg: 'Recado não encontrado'
        });
    }

    note.title = title;
    note.description = description;

    return res.status(200).json({
        success: true,
        data: note
    });
});

app.put("/users/:userID/notes/:id", (req: Request, res: Response) => {
    const { userID, id }: { userID?: string, id?: string } = req.params;

    const user = listOfUsers.find((f) => f.id === userID);
    if(!user) {
        return res.status(404).json({
            msg: 'Usuário não encontrado'
        });
    }

    const note = user.notes.findIndex((f) => f.id === id);
    if(note === -1) {
        return res.status(404).json({
            msg: 'Recado não encontrado'
        });
    }

    const removedNote = user.notes.splice(note, 1);

    return res.status(200).json({
        success: true,
        data: removedNote
    });
});

