import { EventCategory } from '@/types';

export const EVENT_CATEGORIES = [
  { value: EventCategory.CONFERENCE, label: 'Conference', icon: '🎤' },
  { value: EventCategory.WORKSHOP, label: 'Workshop', icon: '🔧' },
  { value: EventCategory.SEMINAR, label: 'Seminar', icon: '📚' },
  { value: EventCategory.MEETUP, label: 'Meetup', icon: '🤝' },
  { value: EventCategory.WEBINAR, label: 'Webinar', icon: '💻' },
  { value: EventCategory.SOCIAL, label: 'Social Event', icon: '🎉' },
  { value: EventCategory.FUNDRAISER, label: 'Fundraiser', icon: '💝' },
  { value: EventCategory.SPORTS, label: 'Sports', icon: '⚽' },
  { value: EventCategory.ARTS, label: 'Arts & Culture', icon: '🎨' },
  { value: EventCategory.TECHNOLOGY, label: 'Technology', icon: '🚀' },
  { value: EventCategory.BUSINESS, label: 'Business', icon: '💼' },
  { value: EventCategory.EDUCATION, label: 'Education', icon: '🎓' },
  { value: EventCategory.OTHER, label: 'Other', icon: '📌' }
];