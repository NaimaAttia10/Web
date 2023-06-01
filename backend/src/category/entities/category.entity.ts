import { Entity , PrimaryGeneratedColumn , Column, OneToMany} from 'typeorm'
import { Timestamp } from '../Generics/timestamp.entity'
import { ProductEntity } from 'src/product/entities/product.entity'

@Entity('category')
export class CategoryEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        unique : true
    })
    name:String
    
    @OneToMany(
        type => ProductEntity,
        (product) => product.category,
        {
            eager : true,
            nullable : true
        }
    )
    products: ProductEntity[]
}