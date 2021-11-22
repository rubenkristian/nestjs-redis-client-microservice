import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Exchange } from './models/exchange';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<Exchange> {
    return this.appService.getHello();
  }

  @Get("/exchange")
  async getExchange(
    @Query("dbio") dbio: number
  ) {
    const usd = await this.appService.getExchange(dbio);

    return {
      dbio: dbio,
      usd: usd,
      success: true
    }
  }
}
