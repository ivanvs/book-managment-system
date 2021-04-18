import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { Response } from 'express';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    console.log(`Handling mongoose error: ${exception}`);
    switch (exception.name) {
      case 'CastError':
        this.sendResponse(400, 'Bad request', host);
        break;
      case 'DocumentNotFoundError':
        this.sendResponse(404, 'Not found', host);
        break;
      default:
        this.sendResponse(500, 'Internal server error', host);
        break;
    }
  }

  sendResponse(statusCode: number, message: string, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
