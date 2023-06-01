import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { CategoryModule } from 'src/category/category.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({  
  imports : [TypeOrmModule.forFeature(
  [ProductEntity, CategoryEntity, BrandEntity]
  ), CategoryModule, BrandModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
