import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ type: 'varchar', length: 500 })
  Name: string;

  @Column({ type: 'varchar', length: 500 })
  Author: string;

  @Column({ type: 'boolean' })
  Rented: boolean;

  @Column({ type: 'varchar', length: 500 })
  PictureUrl: string;
}
