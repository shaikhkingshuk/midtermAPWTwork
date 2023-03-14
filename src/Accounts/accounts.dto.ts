import { IsEmail, IsNotEmpty, IsInt, Length,IsDate, IsString, MinLength, MaxLength} from 'class-validator';

export class CreateOrdDto {
    @IsNotEmpty()
    @MinLength(4,{ message: "'Name' size must be greater than 3.." })
    @MaxLength(30, {message: "'Name' size must be lower 30.."})
    name: string;
}

export class ItemsPricesDto {
    @IsNotEmpty()
    @MinLength(3,{ message: "'Id' size must be greater than 3.." })
    @MaxLength(15, {message: "'Id' size must be lower 15.."})
    items_id: string;

    @IsNotEmpty()
    @IsInt()
    items_quantity: number;

    @IsNotEmpty()
    @IsInt()
    items_price: number;

    orderlistid:number;

}

export class BillsDto {
    @IsNotEmpty()
    @IsInt()
    total_price_of_items: number;

    @IsNotEmpty()
    @IsInt()
    total_price_including_tax: number;

    orderlistid:number;
}

export class TransactionsDto {
    @IsNotEmpty()
    transaction_method: string;

    @IsNotEmpty()
    transaction_date: string;

    @IsNotEmpty()
    transaction_status: string;

    orderlistid:number;
}

export class AccountantForm {   
   

    @IsNotEmpty()
    @MinLength(3,{ message: "'Id' size must be greater than 3.." })
    @MaxLength(15, {message: "'Id' size must be lower 15.."})
     name: string;
    
    @IsEmail() 
     email: string;
 
    @Length(8,16)
    password: string;
 
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    filename:string;
 
 
 }