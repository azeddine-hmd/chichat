import { IsDefined, IsNumber } from 'class-validator';

export class EnterSingleDmValidator {
  @IsDefined()
  @IsNumber()
  otherId: number;

  constructor(args: any[]) {
    this.otherId = args[0];
  }
}
