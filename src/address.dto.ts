import { IsNotEmpty, IsString, Matches, IsNumberString } from 'class-validator';

export class addressDto {
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @Matches(/^\d{4}$/, { message: 'Irányítószám formátuma nem megfelelő. 4 számjegy szükséges.' })
    postcode: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsNumberString({}, { message: 'A házszám csak számjegyeket tartalmazhat.' })
    houseNum: number;
}
