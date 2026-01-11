'use client';

import { useState } from 'react';

interface Folder {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface DocumentFoldersProps {
  currentFolder?: string;
  onFolderChange: (folderId: string | null) => void;
}

const DEFAULT_FOLDERS: Folder[] = [
  { id: 'all', name: 'All Documents', icon: '📁', color: 'gray', count: 0 },
  { id: 'contracts', name: 'Contracts', icon: '📄', color: 'blue', count: 0 },
  { id: 'ndas', name: 'NDAs', icon: '🔒', color: 'purple', count: 0 },
  { id: 'invoices', name: 'Invoices', icon: '💰', color: 'green', count: 0 },
  { id: 'proposals', name: 'Proposals', icon: '📋', color: 'orange', count: 0 },
  { id: 'important', name: 'Important', icon: '⭐', color: 'red', count: 0 },
  { id: 'archived', name: 'Archived', icon: '📦', color: 'gray', count: 0 },
];

export function DocumentFolders({ currentFolder, onFolderChange }: DocumentFoldersProps) {
  const [folders, setFolders] = useState<Folder[]>(DEFAULT_FOLDERS);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: newFolderName.toLowerCase().replace(/\s+/g, '-'),
        name: newFolderName,
        icon: '📁',
        color: 'blue',
        count: 0,
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  const getFolderColorClass = (color: string, isActive: boolean) => {
    if (isActive) {
      return {
        gray: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
        blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100',
        purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100',
        green: 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-100',
        orange: 'bg-orange-100 dark:bg-orange-900/40 text-orange-900 dark:text-orange-100',
        red: 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-100',
      }[color];
    }
    return 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800';
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          Folders
        </h3>
        <button
          onClick={() => setShowNewFolder(!showNewFolder)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded transition-colors"
          title="New folder"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* New Folder Input */}
      {showNewFolder && (
        <div className="px-3 pb-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createFolder()}
              placeholder="Folder name..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button
              onClick={createFolder}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Folder List */}
      <div className="space-y-1">
        {folders.map((folder) => {
          const isActive = currentFolder === folder.id || (folder.id === 'all' && !currentFolder);
          return (
            <button
              key={folder.id}
              onClick={() => onFolderChange(folder.id === 'all' ? null : folder.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getFolderColorClass(folder.color, isActive)}`}
            >
              <span className="text-xl">{folder.icon}</span>
              <span className="flex-1 text-left text-sm font-medium">
                {folder.name}
              </span>
              {folder.count > 0 && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  isActive 
                    ? 'bg-white/20 dark:bg-black/20' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {folder.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 px-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onFolderChange('starred')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="text-xl">⭐</span>
          <span>Starred</span>
        </button>
        <button
          onClick={() => onFolderChange('recent')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="text-xl">🕐</span>
          <span>Recent</span>
        </button>
        <button
          onClick={() => onFolderChange('shared')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="text-xl">👥</span>
          <span>Shared with me</span>
        </button>
      </div>
    </div>
  );
}
