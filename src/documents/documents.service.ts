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

  async findOne(id: string, request: AuthenticatedRequest) {
    const userId = request.user.id;

    const { data, error } = await this.databaseService
      .getClient()
      .from('documents')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to find document: ${error.message}`);
    }
    return data;
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    request: AuthenticatedRequest,
  ) {
    const { title, contentRaw } = updateDocumentDto;
    const userId = request.user.id;

    const { data, error } = await this.databaseService
      .getClient()
      .from('documents')
      .update({ title, content_raw: contentRaw })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }
    return data;
  }

  async remove(id: string, request: AuthenticatedRequest) {
    const userId = request.user.id;

    const { data, error } = await this.databaseService
      .getClient()
      .from('documents')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }

    return data;
  }
}
