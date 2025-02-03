import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Attach the all exceptions filter that we created to be used globally
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // To use the logger Globally - the following commented code can be used:
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true, // because outside of any module, need to give a slight buffer to make sure the service has been instantiated
  // });
  // app.useLogger(app.get(MyLoggerService)); // attach logger service we created to the app for use GLOBALLY

  app.enableCors(); // Allow cross origin resource sharing. enableCors has configurable options for example to whitelist specific domains, etc. As is, this will make it public
  app.setGlobalPrefix('api'); // Global prefix for endpoints, in this case 'root' will be /api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
