'use client';
import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/favoritesService';

export function FavoriteButton({ sessionId }: { sessionId: string }) {
    const [fav, setFav] = useState(false);

    useEffect(() => {
        setFav(isFavorite(sessionId));
    }, [sessionId]);

    const handleToggle = () => {
        const newState = toggleFavorite(sessionId);
        setFav(newState);
    };

    return (
        <button 
            onClick={handleToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full border transition hover:bg-gray-50"
        >
            <span className={fav ? "text-yellow-500" : "text-gray-400"}>
                {fav ? '★' : '☆'}
            </span>
            <span className="text-sm font-medium">
                {fav ? 'Dans mon itinéraire' : 'Ajouter aux favoris'}
            </span>
        </button>
    );
}