import express, {NextFunction, Request, Response} from 'express';
import listOfUsers from '../data';

function userAlreadyExists(req: Request, res: Response, next: NextFunction){
    const { userName }: { userName: string } = req.body;

    const exist = listOfUsers.find((f) => f.userName === userName);

    if(exist) {
        return res.status(400).json({
            msg: 'Esse nome de usuário já existe.'
        })
    }

    next();
}

export default userAlreadyExists;