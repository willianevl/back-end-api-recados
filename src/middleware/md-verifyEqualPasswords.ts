import express, {NextFunction, Request, Response} from 'express';

function verifyEqualPasswords(req: Request, res: Response, next: NextFunction){
    const { password, verifyPassword }: { password: string, verifyPassword: string } = req.body;

    if (password !== verifyPassword) {
        return res.status(400).json({
            msg: 'As senhas devem coincidir.',
        });
    }

    next();
}

export default verifyEqualPasswords;