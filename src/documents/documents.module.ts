import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, AuthGuard],
})
export class DocumentsModule {}
