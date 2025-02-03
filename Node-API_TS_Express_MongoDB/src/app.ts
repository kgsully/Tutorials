import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';  // compresses requests to make them smaller
import cors from 'cors';    // allows for cross origin resource sharing
import morgan from 'morgan'; // logging tool which is useful in development
import Controller from '@/utils/interfaces/controller.interface';  // custom controller interface
import ErrorMiddleware from '@/middleware/error.middleware';  // customer error generation middleware
import helmet from 'helmet';  // security package that helps prevent common api attacks

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        // Call init functions as part of constructor to ensure that initialization happens as part of object instantiation
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();  // added last as error handling middlewares should be initalized last for express
    }

    // method to initialize the various middleware packages
    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false}));
        this.express.use(compression());
    }

    // method to add each controller for use with the express router with api endpoint prefix '/api'
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router)
        });
    }

    // method to initialize error handling middleware
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    // method to initialize database connection, uses .env values to build the connection string
    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            // `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
            `mongodb://127.0.0.1:27017/myapp`
        );
    }

    // start the express listen
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App Listening on Port: ${this.port}`);
        });
    }
}

export default App;
