
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
  startTime: string;
  endTime: string;
}