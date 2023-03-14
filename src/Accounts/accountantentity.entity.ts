import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("accountant")
export class AccountantEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  filename: string;


}