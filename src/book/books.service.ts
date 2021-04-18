import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { BookDto } from './dto/book.dto';
import { MongoPagination, Pageable } from '@algoan/nestjs-pagination';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: BookDto): Promise<Book> {
    const createdCat = new this.bookModel(createBookDto);
    return createdCat.save();
  }

  async update(id: string, updateBookDto: BookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  async deleteById(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id);
  }

  async get(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async findAll(pagination: MongoPagination): Promise<Pageable<Book>> {
    const result = await this.bookModel
      .find()
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec();
    const count = await this.bookModel.count().exec();
    return { totalDocs: count, resource: result };
  }

  async search(
    query: string,
    pagination: MongoPagination,
  ): Promise<Pageable<Book>> {
    const result = await this.bookModel
      .find({ $text: { $search: query } })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec();
    const count = await this.bookModel
      .count({ $text: { $search: query } })
      .exec();

    return { totalDocs: count, resource: result };
  }
}
