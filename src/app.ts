import express, { type Request, type Response, type NextFunction } from "express";
import mongoose from 'mongoose';
import type { Route } from './common/interfaces/route';
import Exception from './common/exception';
import 'dotenv/config'

class App {

    app = express();

    constructor(routes: Route[]) {
        this.connectToDB();
        this.initializeMiddleWares();
        this.intializeRoutes(routes);
        this.initializeErrorHandler();
    }

    private connectToDB() {
        const dbURI = process.env.DB_URI;

        console.log(dbURI);

        if(!dbURI) process.exit(1);

        mongoose.connect(dbURI).catch((e) => { 
            console.log("Error connecting to DB")
            process.exit(1)
        });
    }

    private intializeRoutes(routes: Route[]) {
        routes.map(route => this.app.use('/api/v1', route.router))
    }

    private initializeMiddleWares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initializeErrorHandler() {
        this.app.use((error: unknown, _: Request, res: Response, next: NextFunction) => {
            if(error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message })
            } else if(error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else res.status(500).json({ message: 'Internal Server Error!' })
            
            next()
        })
    }

    startServer() {
        this.app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Listening on PORT ${process.env.PORT || 8000}`)
        })
    }
}

export default App;