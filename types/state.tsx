import { Dispatch, SetStateAction } from "react";

export type State<T> = {
  state: T;
  set: Dispatch<SetStateAction<T>>;
}
