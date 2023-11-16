import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, hashedPassword);
  if (result === undefined) return false;
  return result;
}
