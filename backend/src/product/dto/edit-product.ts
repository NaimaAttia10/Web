import { IsNotEmpty } from "class-validator";
export class ProductEditDTO {
    @IsNotEmpty() 
    productName : String
    @IsNotEmpty() 
    productPrice : number
    @IsNotEmpty() 
    productDescription : String
    @IsNotEmpty() 
    productQty : number
    @IsNotEmpty() 
    category : number
    @IsNotEmpty() 
    brand : number
} 