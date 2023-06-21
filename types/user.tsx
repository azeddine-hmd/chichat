export class User {
  id: number;
  displayName: string;
  username: string;
  avatar: string;

  constructor(opt: {
    id: number;
    displayName: string;
    username: string;
    avatar: string;
  }) {
    this.id = opt.id;
    this.displayName = opt.displayName;
    this.username = opt.username;
    this.avatar = opt.avatar;
  }
}
