import { Entity , PrimaryGeneratedColumn , Column, OneToMany} from 'typeorm'
import { Timestamp } from '../Generics/timestamp.entity'
import { ProductEntity } from 'src/product/entities/product.entity'

@Entity('brand')
export class BrandEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        unique : true
    })
    name:String
    
    @OneToMany(
        type => ProductEntity,
        (product) => product.brand,
        {
            eager : true,
            nullable : true
        }
    )
    product:ProductEntity[]
}