import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { AdminGuard } from 'src/user/admin.guard';
import { BrandAddDTO } from './dto/add-brand';

@Controller('brand')
export class BrandController {
    constructor(private brandService : BrandService){}

    @UseGuards(AdminGuard)
    @Post('/add')
    async addBrand(@Body() brand : BrandAddDTO){
        return await this.brandService.addBrand(brand)
    }
    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteBrand(@Param('id', ParseIntPipe) id : number){
        return await this.brandService.deleteBrand(id)
    }
    @UseGuards(AdminGuard)
    @Get()
    async getBrandsWithProducts(){
        return await this.brandService.getBrandsWithProducts();
    }

}
