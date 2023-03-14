import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './orderentity.entity';

@Entity("bills")
export class BillsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_price_of_items: number;

    @Column()
    total_price_including_tax: number;

    @OneToOne(() => OrderEntity,orderlist=>orderlist.bills, {onDelete: 'CASCADE'})
    @JoinColumn()
    orderlist : OrderEntity
}