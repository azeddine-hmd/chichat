import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class DmEnterSingleOnceValidator {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  args: string[];
}
