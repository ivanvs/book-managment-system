import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    // TODO set auth for mongoDB
    // TODO load from config file configuration for MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/book_managment_system', {
      useNewUrlParser: true,
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
