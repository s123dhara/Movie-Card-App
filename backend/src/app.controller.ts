import { Body, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/search')
  searchMovies(@Query('query') query: string): any {
    return this.appService.searchMovies(query);
  }

  @Get('/get-popular-movies')
  getPopularMovies(): any {
    return this.appService.getPopularMovies();
  }
}
