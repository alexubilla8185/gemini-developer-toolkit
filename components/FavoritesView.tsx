import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { FavoriteComponent, FavoriteRegex } from '../types';
import CodeBlock from './CodeBlock';
import { ICONS } from '../constants';
import { useNotification } from '../context/NotificationContext';

const FavoriteRegexCard: React.FC<{ item: FavoriteRegex }> = ({ item }) => {
    const { removeFavoriteRegex } = useFavorites();
    const { showNotification } = useNotification();

    const handleDelete = () => {
        removeFavoriteRegex(item.id);
        showNotification('Regex removed from collection.', 'success');
    };

    return (
        <div className="bg-surface p-6 rounded-lg border border-border space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-text-muted">Prompt:</p>
                    <p className="font-semibold text-text italic">"{item.prompt}"</p>
                </div>
                <button onClick={handleDelete} className="text-text-muted hover:text-danger transition-colors" aria-label="Delete saved regex">
                    {ICONS.TRASH}
                </button>
            </div>
            <div>
                <p className="text-sm font-semibold mb-2 text-text-muted">Pattern</p>
                <CodeBlock code={item.pattern} />
            </div>
             <div>
                <p className="text-sm font-semibold mb-2 text-text-muted">Explanation</p>
                <div className="p-4 bg-background border border-border rounded-lg whitespace-pre-wrap text-sm leading-relaxed text-text">
                    {item.explanation}
                </div>
            </div>
            <p className="text-xs text-text-muted/50 text-right">Saved on: {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

const FavoriteComponentCard: React.FC<{ item: FavoriteComponent }> = ({ item }) => {
    const { removeFavoriteComponent } = useFavorites();
    const { showNotification } = useNotification();

    const handleDelete = () => {
        removeFavoriteComponent(item.id);
        showNotification('Component removed from collection.', 'success');
    };
    
    return (
        <div className="bg-surface p-6 rounded-lg border border-border space-y-4">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-text-muted">Prompt:</p>
                    <p className="font-semibold text-text italic">"{item.prompt}"</p>
                </div>
                <button onClick={handleDelete} className="text-text-muted hover:text-danger transition-colors" aria-label="Delete saved component">
                    {ICONS.TRASH}
                </button>
            </div>
            <div>
                <p className="text-sm font-semibold mb-2 text-text-muted">Code</p>
                <CodeBlock code={item.code} />
            </div>
            <p className="text-xs text-text-muted/50 text-right">Saved on: {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

const FavoritesView: React.FC = () => {
  const { favoriteComponents, favoriteRegexes } = useFavorites();

  const hasFavorites = favoriteComponents.length > 0 || favoriteRegexes.length > 0;

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
        <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-text sm:text-5xl mb-4">Your Collection</h2>
            <p className="text-lg text-text-muted">Your saved UI components and regular expressions.</p>
        </div>

        {!hasFavorites ? (
             <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center bg-surface rounded-lg border border-border min-h-[40vh]">
                <div className="w-16 h-16 flex items-center justify-center bg-background rounded-full mb-4">
                    {ICONS.STAR}
                </div>
                <h3 className="text-lg font-semibold text-text">Your collection is empty</h3>
                <p className="mt-1 text-sm">Generate components or regex patterns and save them to see them here.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                     <h3 className="text-2xl font-bold text-text border-b border-border pb-2">Saved UI Components ({favoriteComponents.length})</h3>
                     {favoriteComponents.length > 0 ? (
                        favoriteComponents.map(item => <FavoriteComponentCard key={item.id} item={item} />)
                     ) : (
                        <p className="text-text-muted text-sm p-4 bg-surface rounded-lg border border-border">No components saved yet.</p>
                     )}
                </section>
                <section className="space-y-6">
                    <h3 className="text-2xl font-bold text-text border-b border-border pb-2">Saved Regex Patterns ({favoriteRegexes.length})</h3>
                    {favoriteRegexes.length > 0 ? (
                        favoriteRegexes.map(item => <FavoriteRegexCard key={item.id} item={item} />)
                    ) : (
                         <p className="text-text-muted text-sm p-4 bg-surface rounded-lg border border-border">No regex patterns saved yet.</p>
                    )}
                </section>
            </div>
        )}

    </div>
  );
};

export default FavoritesView;
