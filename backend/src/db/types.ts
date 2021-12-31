interface BaseObject {
  createdAt: string;
}

interface ArbitraryObject {
  [key: string]: any;
}

export interface Victim extends BaseObject {
  url: string;
  ip: string;
  type: 'local' | 'online';
  logs?: ArbitraryObject[];
}
