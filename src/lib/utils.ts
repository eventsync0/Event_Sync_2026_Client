export function isLive(startTime: Date | string, endTime: Date | string): boolean {
  const now = Date.now();
  const start = typeof startTime === 'string' ? new Date(startTime).getTime() : startTime.getTime();
  const end = typeof endTime === 'string' ? new Date(endTime).getTime() : endTime.getTime();
  return now >= start && now <= end;
}

export const formatFullDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Indian/Antananarivo'
  }).format(new Date(dateStr));
};

export const formatTime = (dateStr: string): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Indian/Antananarivo',
    hour12: false
  }).format(new Date(dateStr));
};

export function isEventLive(startDate: string, endDate: string): boolean {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return now >= start && now <= end;
}

export function isEventDateReached(startDate: string): boolean {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  return now >= start;
}


export const formatHour = (date: string) => {
  const d = new Date(date);
  return d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const isLiveSession = (startTime: string, endTime: string) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
};