// components/events/EventSearch.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/lib/constants';

interface EventSearchProps {
  initialSearch?: string;
  initialCategory?: string;
}

// Suggestions populaires
const POPULAR_SEARCHES = [
  { label: 'Conference', icon: '🎤' },
  { label: 'Workshop', icon: '🔧' },
  { label: 'React', icon: '⚛️' },
  { label: 'AI Summit', icon: '🤖' },
  { label: 'Cloud', icon: '☁️' },
  { label: 'DevOps', icon: '🚀' },
];

export default function EventSearch({ initialSearch = '', initialCategory = '' }: EventSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(initialSearch);
  const [category] = useState(initialCategory);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Charger les recherches récentes
  useEffect(() => {
    const saved = localStorage.getItem('event_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // Sauvegarder une recherche
  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('event_recent_searches', JSON.stringify(newRecent));
  };

  // Fonction de recherche
  const performSearch = useCallback((searchTerm: string, categoryFilter: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (categoryFilter) params.set('category', categoryFilter);

    const url = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    
    startTransition(() => {
      router.push(url);
      // Ne pas fermer les suggestions immédiatement
      setShowSuggestions(false);
    });

    if (searchTerm.trim()) {
      saveSearch(searchTerm);
    }
  }, [pathname, router]);

  // Gérer la recherche avec debounce
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setShowSuggestions(true);
    
    // Annuler le timeout précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Nouveau timeout avec debounce plus long
    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        performSearch(value, category);
      } else {
        performSearch('', category);
      }
    }, 600); // 600ms pour laisser le temps de taper
  };

  // Gérer le clic sur une suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    performSearch(suggestion, category);
    setShowSuggestions(false);
    // Garder le focus
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  // Gérer les touches clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search.trim()) {
        // Annuler le timeout en cours
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        performSearch(search, category);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Effacer la recherche
  const clearSearch = () => {
    setSearch('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    performSearch('', category);
    setShowSuggestions(false);
    // Garder le focus
    inputRef.current?.focus();
  };

  // Fermer les suggestions en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Raccourci clavier Ctrl+K / Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Nettoyer le timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Suggestions à afficher
  const getSuggestions = () => {
    if (!search.trim()) {
      return recentSearches.length > 0 ? recentSearches : POPULAR_SEARCHES.map(s => s.label);
    }
    
    const term = search.toLowerCase();
    const allSuggestions = [
      ...POPULAR_SEARCHES.map(s => s.label),
      ...EVENT_CATEGORIES.map(c => c.label),
    ];
    
    return allSuggestions
      .filter(s => s.toLowerCase().includes(term))
      .slice(0, 5);
  };

  const suggestions = getSuggestions();

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Barre de recherche */}
      <div className={`
        relative flex items-center rounded-full transition-all duration-300
        ${isFocused || search 
          ? 'bg-white dark:bg-coffee-900 border-2 border-coffee-500 shadow-lg' 
          : 'bg-coffee-50 dark:bg-coffee-900/50 border-2 border-transparent hover:border-coffee-300 dark:hover:border-coffee-700'
        }
      `}>
        {/* Icône de recherche */}
        <Search className={`
          absolute left-4 w-5 h-5 transition-colors duration-300 pointer-events-none
          ${isFocused || search ? 'text-coffee-500' : 'text-coffee-400'}
        `} />

        {/* Input - toujours actif */}
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (search.trim() || recentSearches.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Retarder le blur pour permettre les clics sur les suggestions
            setTimeout(() => {
              setIsFocused(false);
            }, 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search events..."
          className="w-full pl-12 pr-14 py-3 bg-transparent rounded-full outline-none text-coffee-800 dark:text-coffee-100 placeholder:text-coffee-400 dark:placeholder:text-coffee-500"
          disabled={false}
          autoComplete="off"
        />

        {/* Actions à droite */}
        <div className="absolute right-2 flex items-center gap-1">
          {/* Indicateur de chargement */}
          {isPending && (
            <Loader2 className="w-5 h-5 text-coffee-400 animate-spin" />
          )}

          {/* Bouton clear */}
          {search && !isPending && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-full hover:bg-coffee-100 dark:hover:bg-coffee-800 transition-colors"
              type="button"
            >
              <X className="w-5 h-5 text-coffee-400 hover:text-coffee-600" />
            </button>
          )}

          {/* Raccourci clavier */}
          {!search && !isFocused && !isPending && (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-coffee-400 bg-coffee-100 dark:bg-coffee-800 rounded-md">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {(showSuggestions && (suggestions.length > 0 || recentSearches.length > 0)) && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-coffee-950 rounded-2xl shadow-2xl border border-coffee-200 dark:border-coffee-700 overflow-hidden">
          {/* En-tête des suggestions */}
          <div className="px-4 py-3 border-b border-coffee-100 dark:border-coffee-800">
            <span className="text-xs font-semibold text-coffee-400 dark:text-coffee-500 uppercase tracking-wider">
              {search.trim() ? 'Suggestions' : 'Recent Searches'}
            </span>
          </div>

          {/* Liste des suggestions */}
          <ul className="py-2 max-h-80 overflow-y-auto">
            {search.trim() ? (
              suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 hover:bg-coffee-50 dark:hover:bg-coffee-900/50 cursor-pointer flex items-center gap-3 transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Empêche le blur
                    handleSuggestionClick(suggestion);
                  }}
                >
                  <Search className="w-4 h-4 text-coffee-400" />
                  <span className="text-coffee-700 dark:text-coffee-200">{suggestion}</span>
                </li>
              ))
            ) : (
              recentSearches.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 hover:bg-coffee-50 dark:hover:bg-coffee-900/50 cursor-pointer flex items-center gap-3 transition-colors group"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionClick(item);
                  }}
                >
                  <Clock className="w-4 h-4 text-coffee-400" />
                  <span className="text-coffee-700 dark:text-coffee-200 flex-1">{item}</span>
                  <button
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const newRecent = recentSearches.filter(s => s !== item);
                      setRecentSearches(newRecent);
                      localStorage.setItem('event_recent_searches', JSON.stringify(newRecent));
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    <X className="w-4 h-4 text-coffee-400 hover:text-red-500" />
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Footer avec suggestions populaires */}
          {!search.trim() && recentSearches.length === 0 && (
            <div className="border-t border-coffee-100 dark:border-coffee-800 px-4 py-3 bg-coffee-50/50 dark:bg-coffee-900/30">
              <div className="flex items-center gap-2 text-xs text-coffee-500 dark:text-coffee-400">
                <TrendingUp className="w-4 h-4" />
                <span>Popular searches:</span>
                <div className="flex gap-2">
                  {POPULAR_SEARCHES.slice(0, 3).map((item) => (
                    <button
                      key={item.label}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(item.label);
                      }}
                      className="px-2 py-1 bg-white dark:bg-coffee-800 rounded-full hover:bg-coffee-100 dark:hover:bg-coffee-700 transition-colors"
                      type="button"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer avec raccourcis */}
          <div className="border-t border-coffee-100 dark:border-coffee-800 px-4 py-2 bg-coffee-50/50 dark:bg-coffee-900/30 flex items-center justify-between text-xs text-coffee-400 dark:text-coffee-500">
            <span>Press <kbd className="px-2 py-0.5 bg-white dark:bg-coffee-800 border border-coffee-200 dark:border-coffee-700 rounded">↵</kbd> to search</span>
            <span>Press <kbd className="px-2 py-0.5 bg-white dark:bg-coffee-800 border border-coffee-200 dark:border-coffee-700 rounded">Esc</kbd> to close</span>
          </div>
        </div>
      )}
    </div>
  );
}