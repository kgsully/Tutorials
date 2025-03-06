import express, { Express, NextFunction, Request, Response } from 'express';
import usersRouter from './routes/users.routes';

const PORT: number = 5000;

const app: Express = express();

app.use('/api/users', usersRouter);

app.get('/', (_req: Request, res: Response) => {
    res.send({message: "Success!!"});
});


app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
