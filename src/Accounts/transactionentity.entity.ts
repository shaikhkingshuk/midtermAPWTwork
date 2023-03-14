import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './orderentity.entity';

@Entity("transaction")
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transaction_method: string;

    @Column()
    transaction_date: string;

    @Column()
    transaction_status: string;

    @OneToOne(() => OrderEntity,orderlist=>orderlist.transaction, {onDelete: 'CASCADE'})
    @JoinColumn()
    orderlist : OrderEntity
}