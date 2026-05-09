
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
  sessions?: Session[];
}

export interface Session {
  id: string;
  title: string;
  description : string;
  startTime: string;
  endTime: string;
  capacity : number
  room : Room[]
  isLive?: boolean;
}

export interface Room {
  id : string;
  name : string
}