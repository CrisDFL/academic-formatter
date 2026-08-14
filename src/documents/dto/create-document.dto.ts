import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  contentRaw?: string;
}
