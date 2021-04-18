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
  UseInterceptors,
} from '@nestjs/common';
import { MongooseExceptionFilter } from 'src/util/mongoose.exception.filter';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { QueryDto } from './dto/query.dto';
import { Book } from './schema/book.schema';
import {
  LinkHeaderInterceptor,
  MongoPaginationParamDecorator,
  MongoPagination,
  Pageable,
} from '@algoan/nestjs-pagination';

@Controller('books')
@UseFilters(MongooseExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: BookDto): Promise<Book> {
    const createdBook = await this.booksService.create(createBookDto);
    if (!createdBook) {
      throw new BadRequestException();
    }
    return createdBook;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBookDto: BookDto,
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

  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'data' }))
  @Get()
  async findAll(
    @MongoPaginationParamDecorator() pagination: MongoPagination,
  ): Promise<Pageable<Book>> {
    return this.booksService.findAll(pagination);
  }

  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'data' }))
  @Post('search')
  async searchBooks(
    @Body() queryDto: QueryDto,
    @MongoPaginationParamDecorator() pagination: MongoPagination,
  ): Promise<Pageable<Book>> {
    return this.booksService.search(queryDto.query, pagination);
  }
}
