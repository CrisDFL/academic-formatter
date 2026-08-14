import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AuthGuard } from 'src/auth/auth.guard';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
  };
};

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.documentsService.create(createDocumentDto, request);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.documentsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
