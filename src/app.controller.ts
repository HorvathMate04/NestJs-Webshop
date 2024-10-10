import { Controller, Get, Render, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { newOrderDto } from './newOrder.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('rendeles')
  @Render('orderForm')
  getOrder() {
    return { result: false, formData: {}, errors: []}
  }

  @Post('rendeles')
  @Render('orderForm')
  async handleOrder(@Body() orderDto: newOrderDto) {
    try {
      const response = await this.appService.validateData(orderDto);
      if (response.result) {
        return { view: 'completedOrder', formData: orderDto, errors: [] };
      }
      return { result: false, formData: orderDto, errors: response.errors };
    } catch (error) {
      return { result: false, formData: orderDto, errors: error.response?.message || [] };
    }
  }
}
