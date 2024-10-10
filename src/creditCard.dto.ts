import { IsNotEmpty, Matches, ValidateIf, Validate } from 'class-validator';

export class creditCardDto {
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, { message: 'Invalid card number format, expected format XXXX-XXXX-XXXX-XXXX' })
    cardNum: string;

    @IsNotEmpty()
    @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, { message: 'Invalid expiration date format, expected format MM/YYYY' })
    expDate: string;

    @IsNotEmpty()
    @Matches(/^\d{3}$/, { message: 'Invalid security code format, expected format 3 digits' })
    secNum: string;

    @ValidateIf((o) => o.expDate)
    checkCardExpiration() {
        const [month, year] = this.expDate.split('/');
        const expirationDate = new Date(`${year}-${month}-01`);
        if (expirationDate <= new Date()) {
            return false;
        }
        return true;
    }
}
