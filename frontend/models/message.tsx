export interface ChatDateSeparator {
  time: Date;
}

export interface Message {
  content: string | URL;
  createdAt: Date;
  randerType: 'normal' | 'profile',
}
