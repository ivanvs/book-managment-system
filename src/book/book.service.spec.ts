import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  MongooseTestModule,
} from '../util/mongoose.test.module';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schema/book.schema';
import { MongoPagination } from '@algoan/nestjs-pagination';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
      ],
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const createdBook: Book = await service.create({
      authors: ['Ivan Vasiljevic'],
      description: 'test description',
      title: 'test',
    });

    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe('test');
  });

  it('should return empty array if there is no books', async () => {
    const allBooks = await service.findAll(createEmptyPagination());

    expect(allBooks).toBeDefined();
    expect(allBooks.resource.length).toBe(0);
  });

  it('should return all books', async () => {
    await createDummyData();
    const allBooks = await service.findAll(createEmptyPagination());

    expect(allBooks).toBeDefined();
    expect(allBooks.resource.length).toBe(3);
  });

  it('should be able to delete a book', async () => {
    const allBooks = await createDummyData();
    const deletedBook = await service.deleteById(allBooks[0]['id']);

    expect(deletedBook).toBeDefined();

    const booksAfterRemoving = await service.findAll(createEmptyPagination());
    expect(booksAfterRemoving).toBeDefined();
    expect(booksAfterRemoving.resource.length).toBe(2);
  });

  it('should be able to get a book', async () => {
    const allBooks = await createDummyData();
    const searchedBook = await service.get(allBooks[0]['id']);

    expect(searchedBook).toBeDefined();

    expect(searchedBook.title).toBe(allBooks[0].title);
    expect(searchedBook.description).toBe(allBooks[0].description);
  });

  it('should be able to update a book', async () => {
    const allBooks = await createDummyData();

    const bookToUpdate: Book = {
      title: 'React',
      authors: ['Vladimir Dimitrieski'],
      description: 'React tutorial',
    };

    const updatedBook = await service.update(allBooks[0]['_id'], bookToUpdate);

    expect(updatedBook).toBeDefined();
    expect(updatedBook.title).toBe('React');
    expect(updatedBook.description).toBe('React tutorial');

    const resultAfterUpdate = await service.get(updatedBook['_id']);

    expect(resultAfterUpdate.title).toBe('React');
    expect(resultAfterUpdate.description).toBe('React tutorial');
  });

  //search function cannot be tested since in memory mongodb doesn't support full text search

  const createDummyData = async () => {
    const books: Book[] = [];
    books.push(
      await service.create({
        authors: ['Ivan Vasiljevic', 'Dajan Brodanov'],
        description: 'test description',
        title: 'test',
      }),
    );
    books.push(
      await service.create({
        authors: ['Ivo Andric'],
        description: 'Book about Visegradu test',
        title: 'Na Drini cuprija',
      }),
    );
    books.push(
      await service.create({
        authors: ['J.R.R. Tolkien'],
        description: 'Middle-earth',
        title: 'The History of Middle-earth',
      }),
    );

    return books;
  };

  const createEmptyPagination = (): MongoPagination => {
    return { filter: {}, limit: 100, skip: 0, project: {}, sort: {} };
  };

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
