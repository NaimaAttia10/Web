import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDTO } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { UserSignInDTO } from './dto/user-signin';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>,
        private jwtService: JwtService
    ){}

    async signup(userData : UserSignUpDTO ){
        if(userData.signUpPassword != userData.signUpPasswordConfirm ){
            throw new ConflictException("Passwords don't match !");
        }
        const user = this.userRepository.create({
            firstname : userData.signUpFirstName,
            lastname : userData.signUpLastName,
            email : userData.signUpMail,
            adress : userData.signUpAdress,
            postcode : userData.signUpPostCode 
        })
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(userData.signUpPassword, user.salt);
        try{
            await this.userRepository.save(user);
        }catch(e){
            throw new ConflictException("Mail adress already exists !");
        }
        const returnedUser = {
            id : user.id,
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            adress : user.adress,
            postcode : user.postcode,
            role : user.role
        }
        return({
                token: await this.jwtService.signAsync(returnedUser)
            });
    }   


    async login(userData : UserSignInDTO){
        const user = {
            email : userData.loginMail,
            password : userData.loginPassword
        }
        const userFound = await this.userRepository.createQueryBuilder("user").
            where("user.email = :email", {
                email : user.email
            }).getOne();
        if( !userFound ){
            throw new NotFoundException("Email or Password Incorrect !");
        }
        const hashedPassword = await bcrypt.hash(user.password , userFound.salt);
        if(hashedPassword == userFound.password) {

            const payload = {
                id : userFound.id,
                firstname : userFound.firstname,
                lastname : userFound.lastname,
                email : userFound.email,
                adress : userFound.adress,
                postcode : userFound.postcode,
                role : userFound.role
            }
            return({
                token: await this.jwtService.signAsync(payload)
            })
        }else {
            throw new NotFoundException("Email or Password Incorrect !");
        }
    }
}
