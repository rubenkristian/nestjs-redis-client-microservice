import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { DbioToUsdExchange, Exchange } from './models/exchange';

@Injectable()
export class AppService {
  constructor(@Inject('CACHE_EXCHANGE') private client: ClientProxy) {}
  getHello(): Observable<Exchange> {
    const pattern = { cmd: 'cache-exchange' };
    const payload = [];
    
    return this.client.send<Exchange>(pattern, payload);
  }

  getExchange(dbio: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const pattern = { cmd: 'cache-exchange-dai-to-usd' };
      const payload = dbio;
  
      const exchange = this.client.send<DbioToUsdExchange>(pattern, payload);

      exchange.pipe(
        map( response => {
          return response;
        })
      )

      exchange.subscribe({
        next(data) {
          resolve(data.usd);
        },
        error(err) {
          reject(err);
        }
      })
    });
  }
}
