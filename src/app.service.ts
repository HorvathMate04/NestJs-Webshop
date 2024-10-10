import { BadRequestException, Injectable } from '@nestjs/common';
import { newOrderDto } from './newOrder.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async validateData(data: newOrderDto) {
    const dto = plainToInstance(newOrderDto, data);
    const validationErrors = await validate(dto);
    console.log(validationErrors)
    if (validationErrors.length > 0) {
      return {errors : validationErrors, result: false};
    }
    return { result: true }
  }
}
