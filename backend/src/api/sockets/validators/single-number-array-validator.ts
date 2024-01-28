import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class SingleNumberArray {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  args: number[];
}
