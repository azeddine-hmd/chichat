import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { RelationshipActions } from '../relationship-actions';

export class RelationshipDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEnum(RelationshipActions)
  action: RelationshipActions;
}
