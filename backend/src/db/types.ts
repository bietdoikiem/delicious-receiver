interface BaseObject {
  createdAt: string;
}

export interface Victim extends BaseObject {
  url: string;
  ip: string;
  type: 'local' | 'online';
}
