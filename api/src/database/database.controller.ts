import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('ping')
  async getClient(): Promise<unknown[] | { error: string }> {
    const { data, error } = await this.databaseService
      .getClient()
      .from('ping')
      .select('*');
    if (error) return { error: error.message };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data ?? [];
  }
}
