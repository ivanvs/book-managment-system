import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../src/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // We would need to create another MongoDB for testing.
        // To make things easier before running tests you should remove any data from MongoDB
        MongooseModule.forRoot(
          'mongodb://localhost:27017/book_managment_system',
          {
            useNewUrlParser: true,
          },
        ),
        BookModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/books/ (GET)', () => {
    return request(app.getHttpServer()).get('/books/').expect(200).expect('[]');
  });

  describe('/books/ (POST)', () => {
    it('should not create book with empty title', () => {
      return request(app.getHttpServer())
        .post('/books/')
        .send({ description: 'test description', authors: ['Ivan Vasiljevic'] })
        .expect(400)
        .expect(
          '{"statusCode":400,"message":["Title is too long","title must be a string","title should not be empty"],"error":"Bad Request"}',
        );
    });

    it('should not create book with empty description', () => {
      return request(app.getHttpServer())
        .post('/books/')
        .send({ title: 'test', authors: ['Ivan Vasiljevic'] })
        .expect(400)
        .expect(
          '{"statusCode":400,"message":["Description is too long","description must be a string","description should not be empty"],"error":"Bad Request"}',
        );
    });

    it('should not create book with empty authors', () => {
      return request(app.getHttpServer())
        .post('/books/')
        .send({ title: 'test', description: 'test description' })
        .expect(400)
        .expect(
          '{"statusCode":400,"message":["authors must contain at least 1 elements","authors must be an array"],"error":"Bad Request"}',
        );
    });

    //TODO add more tests
  });

  afterAll(async () => {
    await app.close();
  });
});
