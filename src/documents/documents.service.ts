import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DatabaseService } from 'src/database/database.service';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class DocumentsService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    request: AuthenticatedRequest,
  ) {
    const { title, contentRaw } = createDocumentDto;
    const user_id = request.user.id;

    const { data, error } = await this.databaseService
      .getClient()
      .from('documents')
      .insert({ title, content_raw: contentRaw, user_id })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
    return data;
  }

  async findAll(request: AuthenticatedRequest) {
    const userId = request.user.id;

    const { data, error } = await this.databaseService
      .getClient()
      .from('documents')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to find documents: ${error.message}`);
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
