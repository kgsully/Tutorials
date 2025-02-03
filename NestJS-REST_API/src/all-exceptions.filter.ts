/* eslint-disable prettier/prettier */
import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

// Create a type for formatting responses in a consistent way
type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name) // AllExceptionsFilter.name is the context

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        // Define error types here, can also add additional Prisma errors like if there is an error connecting to the DB, etc
        if (exception instanceof HttpException) {
            myResponseObj.statusCode = exception.getStatus();
            myResponseObj.response = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 422;
            myResponseObj.response = exception.message.replaceAll(/\n/g, '');
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = 'Internal Server Error';
        }

        response
            .status(myResponseObj.statusCode)
            .json(myResponseObj)

        this.logger.error(myResponseObj.response, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}
