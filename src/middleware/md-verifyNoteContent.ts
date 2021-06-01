import express, {NextFunction, Request, Response} from 'express';
import NoteInterface from '../interfaces/notes';

function verifyNoteContent(req: Request, res: Response, next: NextFunction){
   const { title, description }: NoteInterface = req.body;
   
   if(!title || !description){
       return res.status(400).json({
           msg: 'Todos os campos devem ser preenchidos'
       });
   }

   next();
}

export default verifyNoteContent;