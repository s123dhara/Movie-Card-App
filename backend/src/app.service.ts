import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppService {

  private BASE_URL: string;
  private HOST_URL: string;
  private API_KEY: string;

  constructor(private configService: ConfigService) {
    this.BASE_URL = this.configService.get<string>('RAPID_BASE_URL') || "";
    this.API_KEY = this.configService.get<string>('RAPID_API_KEY') || "";
    this.HOST_URL = this.configService.get<string>('RAPID_HOST_URL') || "";
  }

  getHello(): object {
    const p = this.configService.get('RAPID_BASE_URL');
    return { "port": p };
  }

  async getPopularMovies(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/most-popular-movies`, {      
        headers: {
          'x-rapidapi-key': this.API_KEY,
          'x-rapidapi-host': this.HOST_URL,
        },
      });

      return response.data; // ✅ Return the response data
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      throw new Error('Failed to fetch movies');
    }
  }

  async searchMovies(query: string): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/autocomplete`, {
        params: { query }, // Pass query as a parameter
        headers: {
          'x-rapidapi-key': this.API_KEY,
          'x-rapidapi-host': this.HOST_URL,
        },
      });

      return response.data; // ✅ Return the response data
    } catch (error) {
      console.error('Error fetching movies:', error.message);
      throw new Error('Failed to fetch movies');
    }
  }
}
