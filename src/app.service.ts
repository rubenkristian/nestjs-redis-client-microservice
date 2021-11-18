import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Exchange } from './models/exchange';

@Injectable()
export class AppService {
  constructor(@Inject('CACHE_EXCHANGE') private client: ClientProxy) {}
  getHello(): Observable<Exchange> {
    const pattern = { cmd: 'cache-exchange' };
    const payload = [];
    
    return this.client.send<Exchange>(pattern, payload);
  }
}
