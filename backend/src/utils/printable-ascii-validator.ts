import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPrintableString', async: false })
class IsPrintableStringConstraint implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    const printableAscii = /^[\x20-\x7E]+$/; // printable ASCII characters range
    return printableAscii.test(text);
  }

  defaultMessage(): string {
    return 'Invalid characters found. Only printable characters are allowed.';
  }
}

export function IsPrintableString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPrintableStringConstraint,
    });
  };
}
