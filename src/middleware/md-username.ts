import express, {NextFunction, Request, Response} from 'express';

function verifyUserName (req: Request, res: Response, next: NextFunction){
    const {userName}: { userName: string } = req.body;

    if(!userName) {
        return res.status(400).json({
            msg: 'O nome de usuário deve ser informado',
        });
    }

    if (userName.trim().length < 3) {
        return res.status(400).json({
            msg: 'O nome de usuário deve conter ao menos 3 caracteres',
        });
    }

    next();
}

export default verifyUserName;