'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Command {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  action: () => void;
  category: 'navigation' | 'document' | 'settings' | 'help';
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    // Navigation
    { id: 'go-dashboard', name: 'Go to Dashboard', description: 'View your main dashboard', icon: '🏠', action: () => router.push('/dashboard'), category: 'navigation' },
    { id: 'go-generate', name: 'Generate Document', description: 'Create a new legal document', icon: '📄', action: () => router.push('/generate'), category: 'navigation', keywords: ['create', 'new'] },
    { id: 'go-checklist', name: 'Compliance Checklist', description: 'View compliance requirements', icon: '✅', action: () => router.push('/checklist'), category: 'navigation' },
    { id: 'go-billing', name: 'Billing & Subscription', description: 'Manage your subscription', icon: '💳', action: () => router.push('/billing'), category: 'navigation', keywords: ['payment', 'upgrade', 'pro'] },
    
    // Document Actions
    { id: 'new-contract', name: 'New Contract', description: 'Generate a service contract', icon: '📝', action: () => router.push('/generate?type=contract'), category: 'document' },
    { id: 'new-nda', name: 'New NDA', description: 'Generate a non-disclosure agreement', icon: '🔒', action: () => router.push('/generate?type=nda'), category: 'document' },
    { id: 'new-invoice', name: 'New Invoice', description: 'Generate an invoice', icon: '💰', action: () => router.push('/generate?type=invoice'), category: 'document' },
    { id: 'new-proposal', name: 'New Proposal', description: 'Generate a project proposal', icon: '📋', action: () => router.push('/generate?type=proposal'), category: 'document' },
    
    // Settings
    { id: 'toggle-dark', name: 'Toggle Dark Mode', description: 'Switch between light and dark theme', icon: '🌙', action: () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    }, category: 'settings', keywords: ['theme', 'appearance'] },
    
    // Help
    { id: 'help-docs', name: 'Documentation', description: 'View help documentation', icon: '📚', action: () => window.open('/docs', '_blank'), category: 'help', keywords: ['support'] },
    { id: 'help-shortcuts', name: 'Keyboard Shortcuts', description: 'View all keyboard shortcuts', icon: '⌨️', action: () => alert('Keyboard Shortcuts:\n\nCmd/Ctrl + K - Open command palette\nCmd/Ctrl + D - Toggle dark mode\nCmd/Ctrl + N - New document\nEsc - Close dialogs'), category: 'help' },
  ];

  const filteredCommands = commands.filter(cmd => {
    const searchLower = search.toLowerCase();
    const nameMatch = cmd.name.toLowerCase().includes(searchLower);
    const descMatch = cmd.description?.toLowerCase().includes(searchLower);
    const keywordsMatch = cmd.keywords?.some(k => k.toLowerCase().includes(searchLower));
    return nameMatch || descMatch || keywordsMatch;
  });

  // Keyboard shortcut to open palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
        setSearch('');
        setSelectedIndex(0);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="command-palette-backdrop"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette */}
      <div className="command-palette glass-card animate-scale-in">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <kbd className="hidden sm:block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 rounded">
              ESC
            </kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">No commands found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <>
              {['navigation', 'document', 'settings', 'help'].map(category => {
                const categoryCommands = filteredCommands.filter(cmd => cmd.category === category);
                if (categoryCommands.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryCommands.map((cmd, idx) => {
                      const globalIdx = filteredCommands.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            setIsOpen(false);
                            setSearch('');
                            setSelectedIndex(0);
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                            globalIdx === selectedIndex
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          <span className="text-2xl">{cmd.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {cmd.name}
                            </div>
                            {cmd.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {cmd.description}
                              </div>
                            )}
                          </div>
                          {globalIdx === selectedIndex && (
                            <kbd className="hidden sm:block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 rounded">
                              ↵
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
              select
            </span>
          </div>
          <span className="hidden sm:block">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
              ⌘K
            </kbd>{' '}
            to open
          </span>
        </div>
      </div>
    </>
  );
}
