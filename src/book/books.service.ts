import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { BookDto } from './dto/book.dto';

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

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
