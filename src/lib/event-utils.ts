// lib/event-utils.ts
import { Event } from '@/types';
import { EVENT_CATEGORIES } from './constants';

export function filterEvents(
  events: Event[], 
  filters: { category?: string; search?: string }
): Event[] {
  let filtered = [...events];

  // Filtrer par catégorie
  if (filters.category) {
    filtered = filtered.filter(event => event.category === filters.category);
  }

  // Filtrer par recherche
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(event => {
      const titleMatch = event.title.toLowerCase().includes(searchLower);
      const descMatch = event.description?.toLowerCase().includes(searchLower) || false;
      
      // Recherche dans la catégorie
      const categoryInfo = EVENT_CATEGORIES.find(c => c.value === event.category);
      const categoryMatch = categoryInfo?.label.toLowerCase().includes(searchLower) || false;
      
      return titleMatch || descMatch || categoryMatch;
    });
  }

  return filtered;
}

export function sortEvents(
  events: Event[], 
  sortBy: string = 'date'
): Event[] {
  const sorted = [...events];

  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'popular':
      return sorted.sort((a, b) => (b.attendees || 0) - (a.attendees || 0));
    default:
      return sorted;
  }
}