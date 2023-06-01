import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Equal, Repository } from 'typeorm';
import { ProductAddDTO } from './dto/add-product';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { ProductEditDTO } from './dto/edit-product';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository : Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepository : Repository<CategoryEntity>,
        @InjectRepository(BrandEntity)
        private brandRepository : Repository<BrandEntity>
    ){}

    async addProduct(product : ProductAddDTO){
        const recievedProduct = {
            name : product.productName,
            price : product.productPrice,
            quantity : product.productQty,
            description : product.productDescription,
            image : product.productImage
        }
        const productToAdd = this.productRepository.create(recievedProduct)
        const category  = await this.categoryRepository.findOne({where : {id : Equal(product.category)}}) ;
        if(!category){
            throw new NotFoundException("Category Not Found !")
        }
        productToAdd.category = category;
        const brand  = await this.brandRepository.findOne({ where : { id : Equal(product.brand)}}) ;
        if(!brand){
            throw new NotFoundException("Brand Not Found !")
        }
        productToAdd.brand = brand;

        return await this.productRepository.save(productToAdd);
    }

    async deleteProduct(id : number){
        const productToDelete = await this.productRepository.findOne({where : {id : Equal(id)}})
        if(!productToDelete){
            throw new NotFoundException("Product Not Found !")
        }
        return await this.productRepository.remove(productToDelete);
    }

    async getProducts(){
        var response = await this.productRepository.query("select * from product")
        for(var i in response){
            const category  = await this.categoryRepository.findOne({where : {id : Equal(response[i].categoryId)}}) ;
            if(!category){
                throw new NotFoundException("Category Not Found !")
            }
            response[i].categoryName = category.name;
            const brand  = await this.brandRepository.findOne({ where : { id : Equal(response[i].brandId)}}) ;
            if(!brand){
                throw new NotFoundException("Brand Not Found !")
            }
            response[i].brandName = brand.name;
        }
        return response
    }

    async getProduct(id : number){
        var response = await this.productRepository.query(`select * from product where id =${id}`)
        if(response.length == 0 || !response) {
            throw new NotFoundException("Product Not Found !")
        }
        const category  = await this.categoryRepository.findOne({where : {id : Equal(response[0].categoryId)}}) ;
        if(!category){
            throw new NotFoundException("Category Not Found !")
        }
        response[0].categoryName = category.name;
        const brand  = await this.brandRepository.findOne({ where : { id : Equal(response[0].brandId)}}) ;
        if(!brand){
            throw new NotFoundException("Brand Not Found !")
        }
        response[0].brandName = brand.name;
        return response[0];
    }

    async editProduct(id : number, toEdit : ProductEditDTO){
        const category  = await this.categoryRepository.findOne({where : {id : Equal(toEdit.category)}}) ;
        if(!category){
            throw new NotFoundException("Category Not Found !")
        }
        const brand  = await this.brandRepository.findOne({ where : { id : Equal(toEdit.brand)}}) ;
        if(!brand){
            throw new NotFoundException("Brand Not Found !")
        }
        const editedProduct = {
            name : toEdit.productName,
            price : toEdit.productPrice,
            quantity : toEdit.productQty,
            description : toEdit.productDescription,
            category : category,
            brand : brand
        }
        const productToEdit = await this.productRepository.preload({
            id,
            ...editedProduct
        })
        if(!productToEdit){
            throw new NotFoundException("Product Not Found !")
        }

        return await this.productRepository.save(productToEdit);
    }

}
