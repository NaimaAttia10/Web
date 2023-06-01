import { IsNotEmpty } from "class-validator";
export class ProductAddDTO {
    @IsNotEmpty() 
    productName : String
    @IsNotEmpty() 
    productPrice : number
    @IsNotEmpty() 
    productDescription : String
    @IsNotEmpty() 
    productQty : number
    @IsNotEmpty() 
    productImage : String
    @IsNotEmpty() 
    category : number
    @IsNotEmpty() 
    brand : number
}