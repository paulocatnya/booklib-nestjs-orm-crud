import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { Book } from 'src/database/entities/Book.entity';
import { CreateBookDTO } from '../dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Book> {
    const id = params.id;
    return this.booksService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateBookDTO) {
    return this.booksService.create(dto);
  }

  @Put(':id')
  update(@Param() params, @Body() dto: CreateBookDTO) {
    return this.booksService.update(params.id, dto);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.booksService.delete(params.id);
  }
}
