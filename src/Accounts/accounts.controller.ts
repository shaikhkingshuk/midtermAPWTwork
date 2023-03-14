import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CreateOrdDto,ItemsPricesDto,BillsDto,TransactionsDto, AccountantForm } from "./accounts.dto";
import { AccountsService } from "./accounts.service";
import { OrdUpdate,ItemsUpdate, billsUpdate, transUpdate } from "./accupdate.dto";

@Controller("/accounts")
export class AccountsController {
    constructor(private accountsService: AccountsService) { }



/*##############--------------CUSTOMER ORDER----------------##################*/

    @Post("/createord")
    @UsePipes(new ValidationPipe())
    createOrd(@Body() createord: CreateOrdDto): any {
        return this.accountsService.createOrd(createord);
    }

    @Get('/allorders')
    getOrd(): any {
        return this.accountsService.getAllOrds();
    }

    @Put('/updateord/:id')
    @UsePipes(new ValidationPipe())
    updateOrdbyid(
        @Body() orddto: OrdUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.accountsService.updateOrdbyid(orddto, id);
    }

    @Delete('/deleteord/:id')
    @UsePipes(new ValidationPipe())
    deleteOrdbyid(@Param('id', ParseIntPipe) id: number): any {
        return this.accountsService.deleteOrdbyid(id);

    }

/*##############--------------ALL ORDERED ITEMS WITH PRICE----------------##################*/
    
    @Post("/createorditemprice")
    @UsePipes(new ValidationPipe())
    createItemsPrice(@Body() ipdto: ItemsPricesDto): any {
        return this.accountsService.createItemsPrice(ipdto);
    }

    @Get('/allordereditempricelist')
    getallordereditempricelist(): any {
        return this.accountsService.getallordereditempricelist();
    }

    @Put('/updateorderemitem/:id')
    @UsePipes(new ValidationPipe())
    updateOrditemsbyid(
        @Body() itmdto: ItemsUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.accountsService.updateOrditemsbyid(itmdto, id);
    }

    

/*##############--------------ORDERED PRODUCTS TOTAL BILL----------------##################*/


    @Post("/createbills")
    @UsePipes(new ValidationPipe())
    createBills(@Body() bdto: BillsDto): any {
        return this.accountsService.createBills(bdto);
    }

    @Get('/allbillslist')
    allbillslist(): any {
        return this.accountsService.allbillslist();
    }

    @Put('/updatebills/:id')
    @UsePipes(new ValidationPipe())
    updatebills(
        @Body() billsdto: billsUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.accountsService.updatebills(billsdto, id);
    }

    @Delete('/deletebills/:id')
    @UsePipes(new ValidationPipe())
    deletebills(@Param('id', ParseIntPipe) id: number): any {
        return this.accountsService.deletebills(id);

    }

/*##############--------------TRANSACTION METHODS----------------##################*/

    @Post("/createTransactions")
    @UsePipes(new ValidationPipe())
    createTransactions(@Body() trandto: TransactionsDto): any {
        return this.accountsService.createTransactions(trandto);
    }

    @Get('/alltransactionslist')
    alltransactionslist(): any {
        return this.accountsService.alltransactionslist();
    }

    @Put('/updatetransactions/:id')
    @UsePipes(new ValidationPipe())
    updatetransactions(
        @Body() transdto: transUpdate,
        @Param('id', ParseIntPipe) id: number,
    ): any {
        return this.accountsService.updatetransactions(transdto, id);
    }

    @Delete('/deletetransactions/:id')
    @UsePipes(new ValidationPipe())
    deletetransactions(@Param('id', ParseIntPipe) id: number): any {
        return this.accountsService.deletetransactions(id);

    }

/*##############--------------RELATIONS----------------##################*/


    @Get('/getitempricebyorderedID/:id')
    getitempricebyorderedID(@Param('id', ParseIntPipe) id: number): any {
      return this.accountsService.getitempricebyorderedID(id);
    }

    @Get('/getbillsbyorderedID/:id')
    getbillsbyorderedID(@Param('id', ParseIntPipe) id: number): any {
      return this.accountsService.getbillsbyorderedID(id);
    }

    @Get('/gettransactionsbyorderedID/:id')
    gettransactionsbyorderedID(@Param('id', ParseIntPipe) id: number): any {
      return this.accountsService.gettransactionsbyorderedID(id);
    }

/*#################---------------sing_up-----------------###############*/

    
@Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:AccountantForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1600000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.accountsService.signup(mydto);
console.log(file)
}


/*#################---------------sing_in-----------------###############*/
    

@Get('/signin')
signin(@Body() mydto:AccountantForm)
{
    console.log(mydto.password);
    return this.accountsService.signin(mydto);
}


}