import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  hello() {
    return {message: 'hello world'};
  }
}