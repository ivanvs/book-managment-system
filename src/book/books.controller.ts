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
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('books')
@UseFilters(MongooseExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiCreatedResponse({ description: 'Book is successfully created' })
  @ApiBadRequestResponse({ description: 'Book cannot be created' })
  @ApiOperation({ description: 'Endpoint for creation of book' })
  @Post()
  async create(@Body() createBookDto: BookDto): Promise<Book> {
    const createdBook = await this.booksService.create(createBookDto);
    if (!createdBook) {
      throw new BadRequestException();
    }
    return createdBook;
  }

  @ApiNotFoundResponse({ description: 'Book with given id cannot be found' })
  @ApiOperation({ description: 'Endpoint that can be used to update the book' })
  @ApiParam({
    name: 'id',
    description: 'ID of book',
    required: true,
  })
  @ApiOkResponse({ description: 'Updated book' })
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

  @ApiOperation({
    description: 'Endpoint that can be used to delete specific book',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of book',
    required: true,
  })
  @ApiNotFoundResponse({ description: "Book with given ID deosn't exists" })
  @ApiOkResponse({ description: 'Deleted book with given ID' })
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Book> {
    const deletedBook = await this.booksService.deleteById(id);
    if (!deletedBook) {
      throw new NotFoundException();
    }
    return deletedBook;
  }

  @ApiOperation({
    description: 'Endpoint that can be used for getting specific book',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of book',
    required: true,
  })
  @ApiNotFoundResponse({ description: "Book with given ID deosn't exists" })
  @ApiOkResponse({ description: 'Book with given ID' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.get(id);
    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  @ApiOperation({ description: 'Endpoint that can be used to get all books' })
  @ApiParam({
    name: 'page',
    description:
      'Used for pagination. Number of page for which we need results',
    required: false,
  })
  @ApiParam({
    name: 'per_page',
    description: 'Used for pagination. Number of items in one page',
    required: false,
  })
  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'data' }))
  @ApiOkResponse({ description: 'All or paginated number of books' })
  @Get()
  async findAll(
    @MongoPaginationParamDecorator() pagination: MongoPagination,
  ): Promise<Pageable<Book>> {
    return this.booksService.findAll(pagination);
  }

  @ApiOperation({
    description: 'Endpoint that can be used for searching the books',
  })
  @ApiParam({
    name: 'page',
    description:
      'Used for pagination. Number of page for which we need results',
    required: false,
  })
  @ApiParam({
    name: 'per_page',
    description: 'Used for pagination. Number of items in one page',
    required: false,
  })
  @ApiAcceptedResponse({
    description: 'Books that match for given query. Paginated or all',
  })
  @UseInterceptors(new LinkHeaderInterceptor({ resource: 'data' }))
  @Post('search')
  async searchBooks(
    @Body() queryDto: QueryDto,
    @MongoPaginationParamDecorator() pagination: MongoPagination,
  ): Promise<Pageable<Book>> {
    return this.booksService.search(queryDto.query, pagination);
  }
}
