import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, AuthGuard],
  imports: [DatabaseModule],
})
export class DocumentsModule {}
