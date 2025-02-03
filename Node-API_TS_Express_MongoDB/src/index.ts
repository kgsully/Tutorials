import 'dotenv/config';             // imports all of the .env config variables
import 'module-alias/register';     // register all module aliases for resolving paths
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';

// Call validateEnv to ensure env file is properly read and all required environment variables are present
validateEnv();

const app = new App([new PostController()], Number(process.env.PORT));

app.listen();
