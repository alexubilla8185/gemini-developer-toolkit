import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { FavoriteComponent, FavoriteRegex } from '../types';

interface FavoritesContextType {
  favoriteComponents: FavoriteComponent[];
  favoriteRegexes: FavoriteRegex[];
  addFavoriteComponent: (component: FavoriteComponent) => void;
  removeFavoriteComponent: (id: string) => void;
  addFavoriteRegex: (regex: FavoriteRegex) => void;
  removeFavoriteRegex: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteComponents, setFavoriteComponents] = useLocalStorage<FavoriteComponent[]>('favoriteComponents', []);
  const [favoriteRegexes, setFavoriteRegexes] = useLocalStorage<FavoriteRegex[]>('favoriteRegexes', []);

  const addFavoriteComponent = useCallback((component: FavoriteComponent) => {
    setFavoriteComponents((prev) => [component, ...prev]);
  }, [setFavoriteComponents]);

  const removeFavoriteComponent = useCallback((id: string) => {
    setFavoriteComponents((prev) => prev.filter((c) => c.id !== id));
  }, [setFavoriteComponents]);

  const addFavoriteRegex = useCallback((regex: FavoriteRegex) => {
    setFavoriteRegexes((prev) => [regex, ...prev]);
  }, [setFavoriteRegexes]);

  const removeFavoriteRegex = useCallback((id: string) => {
    setFavoriteRegexes((prev) => prev.filter((r) => r.id !== id));
  }, [setFavoriteRegexes]);

  return (
    <FavoritesContext.Provider value={{
      favoriteComponents,
      favoriteRegexes,
      addFavoriteComponent,
      removeFavoriteComponent,
      addFavoriteRegex,
      removeFavoriteRegex,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
