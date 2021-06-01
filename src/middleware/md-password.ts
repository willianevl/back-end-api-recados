import express, {NextFunction, Request, Response} from 'express';

function verifyPasswords(req: Request, res: Response, next: NextFunction){
    const { password, verifyPassword }: { password: string, verifyPassword: string } = req.body;

    if (!password || !verifyPassword) {
        return res.status(400).json({
            msg: 'A senha deve ser informada.',
        });
    }

    if (password.trim().length < 6 || verifyPassword.trim().length < 6) {
        return res.status(400).json({
            msg: 'A senha deve conter ao menos 6 caracteres.',
        });
    }

    next();
}

export default verifyPasswords;