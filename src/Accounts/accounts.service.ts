import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from "./orderentity.entity";
import { CreateOrdDto,ItemsPricesDto,BillsDto,TransactionsDto } from "./accounts.dto";
import { OrdUpdate,ItemsUpdate, billsUpdate,transUpdate } from "./accupdate.dto";
import { TransactionEntity } from "./transactionentity.entity";
import { BillsEntity } from "./billentity.entity";
import { ItemPriceEntity } from "./itempriceentity.entity";
import { AccountantEntity } from "./accountantentity.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordRepo: Repository<OrderEntity>,
        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
        @InjectRepository(BillsEntity)
        private billsRepo: Repository<BillsEntity>,
        @InjectRepository(ItemPriceEntity)
        private itemsRepo: Repository<ItemPriceEntity>,
        @InjectRepository(AccountantEntity)
        private adminRepo: Repository<AccountantEntity>
    ) { }



   

    /*#################------------------for ordered custormers-----------------##############*/

    
    createOrd(createOrd: CreateOrdDto): any {
        const neword = new OrderEntity()
        neword.name = createOrd.name;
        return this.ordRepo.save(neword);
    }

    getAllOrds(): any {
        return this.ordRepo.find();
    }

    updateOrdbyid(orddto: OrdUpdate, id): any {
        return this.ordRepo.update(id, orddto);
    }

    deleteOrdbyid(id): any {
        return this.ordRepo.delete(id);
    }

    /*################--------------for item prices-------------##################*/

    createItemsPrice(createItems: ItemsPricesDto): any {
        return this.itemsRepo.save(createItems);
    }

    getallordereditempricelist(): any {
        return this.itemsRepo.find();
    }

    updateOrditemsbyid(itemsdto: ItemsUpdate, id): any {
        return this.itemsRepo.update(id, itemsdto);
    }


    
    /*###################------------------for bills------------------######################*/

    createBills(createBills: BillsDto): any {
        return this.billsRepo.save(createBills);
    }

    allbillslist(): any {
        return this.billsRepo.find();
    }

    updatebills(billsdto: billsUpdate, id): any {
        return this.billsRepo.update(id, billsdto);
    }

    deletebills(id): any {
        return this.billsRepo.delete(id);
    }
    
    /*###################----------------------for transaction---------------------##############*/

    createTransactions(createTransactions: TransactionsDto): any {
        return this.transactionRepo.save(createTransactions);
    }

    alltransactionslist(): any {
        return this.transactionRepo.find();
    }

    updatetransactions(transdto: transUpdate, id): any {
        return this.transactionRepo.update(id, transdto);
    }

    deletetransactions(id): any {
        return this.transactionRepo.delete(id);
    }

    /*##################-------------------others----------------##################*/

    getitempricebyorderedID(id):any {
        return this.ordRepo.find({ 
                where: {id:id},
            relations: {
                itemprice: true,
            },
         });
    }

    getbillsbyorderedID(id):any {
        return this.ordRepo.find({ 
                where: {id:id},
            relations: {
                bills: true,
            },
         });
    }

    gettransactionsbyorderedID(id):any {
        return this.ordRepo.find({ 
                where: {id:id},
            relations: {
                transaction: true,
            },
         });
    }

    /*##################---------------------signup-----------------######################*/

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.adminRepo.save(mydto);
        }


    /*##################---------------------signin-----------------######################*/

    async signin(mydto){
    console.log(mydto.password);
    const mydata= await this.adminRepo.findOneBy({email: mydto.email});
    const isMatch= await bcrypt.compare(mydto.password, mydata.password);
    if(isMatch) {
        return (message=> "You've logged in successfully..");
    }
    else {
        return (message=> "Invalid credentials");
    }
    
    }  
}