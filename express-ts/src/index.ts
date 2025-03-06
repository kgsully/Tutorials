import express, { Express, Request, Response } from 'express';

const port: number = 5000;

const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
    res.send({message: "Hello World! App is running"});
})

app.get('/hi', (_req: Request, res: Response) => {
    res.send("HI!");
})

app.listen(port, () => {console.log(`app is listening on port ${port}`)});
