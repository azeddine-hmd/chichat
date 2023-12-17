import * as Yup from "yup";

export function strongEmail(): Yup.StringSchema<
  string | undefined,
  Yup.AnyObject,
  undefined,
  ""
> {
  return Yup.string().matches(
    /^(?![\w\.@]*\.\.)(?![\w\.@]*\.@)(?![\w\.]*@\.)\w+[\w\.]*@[\w\.]+\.\w{2,}$/,
    "invalid email address"
  );
}

export function strongPassword(): Yup.StringSchema<
  string | undefined,
  Yup.AnyObject,
  undefined,
  ""
> {
  return Yup.string().matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase and lowercase, one number and one special case character"
  );
}
