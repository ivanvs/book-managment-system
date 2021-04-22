import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  MongooseTestModule,
} from '../util/mongoose.test.module';
import { Book, BookSchema } from './schema/book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createEmptyPagination } from '../util/test.util';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;
  let book: Book;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
      ],
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            constructor: jest.fn(),
            search: jest.fn(),
            findAll: jest.fn(),
            get: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    controller = module.get<BooksController>(BooksController);
    book = createBook();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('search should return empty result set if there is no results', async () => {
    jest
      .spyOn(service, 'search')
      .mockReturnValue(
        Promise.resolve({ totalDocs: 0, resource: [] as Book[] }),
      );
    expect(
      controller.searchBooks({ query: 'test' }, createEmptyPagination()),
    ).toEqual(Promise.resolve({}));
  });

  //search and findAll doesn't have any real business logic, so there is no point testing them

  describe('findById', () => {
    it('should find Book', async () => {
      jest.spyOn(service, 'get').mockReturnValue(Promise.resolve(book));
      expect(controller.findById('1')).toEqual(Promise.resolve(book));
    });

    it('should throw exception if book is not found', async () => {
      jest.spyOn(service, 'get').mockReturnValue(Promise.resolve(null));
      expect(controller.findById('1')).rejects.toEqual(new NotFoundException());
    });
  });

  describe('deleteById', () => {
    it('should delete Book', async () => {
      jest.spyOn(service, 'deleteById').mockReturnValue(Promise.resolve(book));
      expect(controller.deleteById('1')).toEqual(Promise.resolve(book));
    });

    it('should throw exception if book is not found', async () => {
      jest.spyOn(service, 'deleteById').mockReturnValue(Promise.resolve(null));
      expect(controller.deleteById('1')).rejects.toEqual(
        new NotFoundException(),
      );
    });
  });

  describe('updateById', () => {
    it('should update Book', async () => {
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(book));
      expect(controller.updateById('1', book)).toEqual(Promise.resolve(book));
    });

    it('should throw exception if book is not found', async () => {
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(null));
      expect(controller.updateById('1', book)).rejects.toEqual(
        new NotFoundException(),
      );
    });
  });

  describe('create', () => {
    it('should create Book', async () => {
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(book));
      expect(controller.create(book)).toEqual(Promise.resolve(book));
    });

    it('should throw exception cannot be created', async () => {
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(null));
      expect(controller.create(book)).rejects.toEqual(
        new BadRequestException(),
      );
    });
  });

  const createBook = (): Book => {
    return {
      title: 'test',
      description: 'test description',
      authors: ['Ivan Vasiljvic'],
    };
  };

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
