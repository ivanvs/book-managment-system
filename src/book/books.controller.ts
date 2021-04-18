import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { MongooseExceptionFilter } from 'src/util/mongoose.exception.filter';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schema/book.schema';

@Controller('books')
@UseFilters(MongooseExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = await this.booksService.create(createBookDto);
    if (!createdBook) {
      throw new BadRequestException();
    }
    return createdBook;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const updatedBook = await this.booksService.update(id, updateBookDto);
    if (!updatedBook) {
      throw new NotFoundException();
    }
    return updatedBook;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Book> {
    const deletedBook = await this.booksService.deleteById(id);
    if (!deletedBook) {
      throw new NotFoundException();
    }
    return deletedBook;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.get(id);
    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
