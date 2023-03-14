import { Entity, Column, PrimaryGeneratedColumn, OneToMany,OneToOne,JoinColumn } from 'typeorm';
import { BillsEntity } from './billentity.entity';
import { ItemPriceEntity } from './itempriceentity.entity';
import { TransactionEntity } from './transactionentity.entity';

@Entity('orderlist')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ItemPriceEntity, itemprice => itemprice.orderlist)
    itemprice: ItemPriceEntity[]

    @OneToOne(() => BillsEntity,bills => bills.orderlist)
    bills: BillsEntity;

    @OneToOne(() => TransactionEntity,transaction => transaction.orderlist)
    transaction: TransactionEntity;
}