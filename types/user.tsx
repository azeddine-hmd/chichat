export class User {
  id: number;
  displayName: string;
  username: string;
  avatar: string;

  constructor(
    id: number,
    displayName: string,
    username: string,
    avatar: string
  ) {
    this.id = id;
    this.displayName = displayName;
    this.username = username;
    this.avatar = avatar;
  }
}
