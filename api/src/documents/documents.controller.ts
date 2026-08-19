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
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(
    // Acceder al cuerpo de la solicitud y al objeto de solicitud autenticada
    @Body() createDocumentDto: CreateDocumentDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.documentsService.create(createDocumentDto, request);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.documentsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.documentsService.findOne(id, request);
  }

  @Patch(':id')
  update(
    // Acceder al parámetro de ruta, al cuerpo de la solicitud y al objeto de solicitud autenticada
    @Param('id') id: string, // -> Acceder al parámetro de ruta 'id' (id del documento a actualizar)
    @Body() updateDocumentDto: UpdateDocumentDto,
    @Req() request: AuthenticatedRequest, // -> Acceder al objeto de solicitud autenticada (uuid del usuario)
  ) {
    return this.documentsService.update(id, updateDocumentDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.documentsService.remove(id, request);
  }
}
