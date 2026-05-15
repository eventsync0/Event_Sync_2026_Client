const KEY = 'eventsync_favorites';

export function getFavoriteIds(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
        return [];
    }
}

export function toggleFavorite(sessionId: string): boolean {
    const favorites = getFavoriteIds();
    const index = favorites.indexOf(sessionId);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem(KEY, JSON.stringify(favorites));
        return false;
    } else {
        favorites.push(sessionId);
        localStorage.setItem(KEY, JSON.stringify(favorites));
        return true;
    }
}

export function isFavorite(sessionId: string): boolean {
    return getFavoriteIds().includes(sessionId);
}