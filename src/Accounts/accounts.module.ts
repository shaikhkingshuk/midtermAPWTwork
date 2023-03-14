import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./orderentity.entity";
import { TransactionEntity } from "./transactionentity.entity";
import { BillsEntity } from "./billentity.entity";
import { ItemPriceEntity } from "./itempriceentity.entity";
import { AccountantEntity } from "./accountantentity.entity";


@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity,TransactionEntity,BillsEntity,ItemPriceEntity,AccountantEntity])],
    controllers: [AccountsController],
    providers: [AccountsService],
})

export class AccountsModule {
}
