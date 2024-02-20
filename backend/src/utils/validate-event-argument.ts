import { validate } from 'class-validator';

export async function validateEventArgument<T extends object>(data: T) {
  const errors = await validate(data);
  if (errors.length > 0) throw new Error(`validation error: ${errors}`);
  return data;
}
