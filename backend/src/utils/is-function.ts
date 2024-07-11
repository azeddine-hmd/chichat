import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsFunctionConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    return typeof value === 'function';
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Property must be a function';
  }
}

export function IsFunction(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFunctionConstraint,
    });
  };
}
