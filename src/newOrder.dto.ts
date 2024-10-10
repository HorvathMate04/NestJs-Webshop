import { Type } from 'class-transformer';
import { addressDto } from './address.dto';
import { creditCardDto } from './creditCard.dto';
import { IsNotEmpty, IsString, Matches, ValidateIf, ValidateNested } from 'class-validator';

export class newOrderDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => addressDto)
    recipeAddress: addressDto;

    @IsNotEmpty() 
    @ValidateNested()
    @Type(() => addressDto)
    deliveryAddress: addressDto;

    @ValidateIf((o) => o.code && o.code !== '')
    @Matches(/^[A-Z]{2}-\d{4}$/, { message: 'Kuponkód formátuma nem érvényes. Helyes formátum: BB-SSSS.' })
    code: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => creditCardDto)
    cardInfo: creditCardDto;
}
