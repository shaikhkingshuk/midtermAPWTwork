import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { OrderEntity } from './orderentity.entity';

@Entity('itemprice')
export class ItemPriceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    items_id: string;

    @Column()
    items_quantity: number;

    @Column()
    items_price: number;

    @ManyToOne(() => OrderEntity, orderlist => orderlist.itemprice,{onDelete: 'CASCADE'})
    orderlist : OrderEntity
}