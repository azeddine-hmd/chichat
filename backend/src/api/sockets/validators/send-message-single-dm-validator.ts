import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsPrintableString } from '../../../utils/printable-ascii-validator';
import { upload } from '../../../config/multer';

export class SendMessageSingleDmValidator {
  @IsDefined()
  @IsString()
  @IsUUID()
  dmId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPrintableString({ message: 'validation error' })
  message: string;

  constructor(args: any[]) {
    this.dmId = args[0];
    this.message = args[1];
  }
}
