import { IsNotEmpty } from 'class-validator';

export class getImageSourceDto {
  @IsNotEmpty()
  source_id: string;
  @IsNotEmpty()
  source_media_id: string;
  @IsNotEmpty()
  chapter_id: string;
}
