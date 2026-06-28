export enum EventCategory {
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  MEETUP = 'MEETUP',
  WEBINAR = 'WEBINAR',
  SOCIAL = 'SOCIAL',
  FUNDRAISER = 'FUNDRAISER',
  SPORTS = 'SPORTS',
  ARTS = 'ARTS',
  TECHNOLOGY = 'TECHNOLOGY',
  BUSINESS = 'BUSINESS',
  EDUCATION = 'EDUCATION',
  OTHER = 'OTHER'
}
export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  startDate: string;
  endDate: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
  sessions?: Session[];
  attendees?: number;
}

export interface Speaker {
  id: string;
  fullName: string;
  photoUrl?: string;
  bio?: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface Session {
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    roomId: string;
    room?: Room;     
    capacity: number;
    speakerIds: string[];
    speakers?: Speaker[];
    eventId: string;
    event?: Event;
    isLive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}