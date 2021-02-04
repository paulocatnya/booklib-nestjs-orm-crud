import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/database/entities/Book.entity';
import { Repository } from 'typeorm';
import { CreateBookDTO } from '../dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBookDTO) {
    const bookExists = await this.bookRepository.findOne({
      where: { Name: dto.name, Author: dto.author },
    });

    if (bookExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `This book name/author already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.bookRepository.insert({
      Name: dto.name,
      PictureUrl: dto.pictureUrl,
      Author: dto.author,
      Rented: dto.rented,
    });
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findById(id: string) {
    return await this.bookRepository.findOne({ where: { Id: id } });
  }

  async update(id: string, dto: CreateBookDTO): Promise<Book[]> {
    const newBook = await this.bookRepository.findOne(id);

    if (!newBook) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Book doesn't exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    newBook.Name = dto.name;
    newBook.Author = dto.author;
    newBook.PictureUrl = dto.pictureUrl;
    newBook.Rented = dto.rented;
    await this.bookRepository.save(newBook);
    return this.bookRepository.find();
  }

  async delete(id: string) {
    const book = await this.bookRepository.findOne({ where: { Id: id } });
    if (!book) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Book doesn't exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.bookRepository.remove(book);
    return this.bookRepository.find();
  }
}
