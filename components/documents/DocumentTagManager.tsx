'use client';

import { useState } from 'react';

interface DocumentTagManagerProps {
  documentId: string;
  initialTags?: string[];
  onTagsUpdate?: (tags: string[]) => void;
}

const PRESET_TAGS = [
  { label: 'Important', color: 'red', icon: '⭐' },
  { label: 'Draft', color: 'yellow', icon: '📝' },
  { label: 'Reviewed', color: 'green', icon: '✅' },
  { label: 'Signed', color: 'blue', icon: '✍️' },
  { label: 'Archived', color: 'gray', icon: '📦' },
  { label: 'Urgent', color: 'red', icon: '🔥' },
  { label: 'Client', color: 'purple', icon: '👤' },
  { label: 'Internal', color: 'indigo', icon: '🏢' },
];

export function DocumentTagManager({ documentId, initialTags = [], onTagsUpdate }: DocumentTagManagerProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');
  const [showPresets, setShowPresets] = useState(false);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onTagsUpdate?.(updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(t => t !== tagToRemove);
    setTags(updatedTags);
    onTagsUpdate?.(updatedTags);
  };

  const getTagColor = (tag: string) => {
    const preset = PRESET_TAGS.find(p => p.label === tag);
    if (preset) {
      return {
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
        gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      }[preset.color];
    }
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  const getTagIcon = (tag: string) => {
    const preset = PRESET_TAGS.find(p => p.label === tag);
    return preset?.icon || '🏷️';
  };

  return (
    <div className="space-y-3">
      {/* Current Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <span className="text-sm text-gray-400 dark:text-gray-500">No tags yet</span>
        ) : (
          tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)} transition-all hover:scale-105`}
            >
              <span>{getTagIcon(tag)}</span>
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:opacity-70 transition-opacity"
                aria-label={`Remove ${tag} tag`}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      {/* Add Tag Input */}
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
            onFocus={() => setShowPresets(true)}
            placeholder="Add custom tag..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => addTag(newTag)}
            disabled={!newTag}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>

        {/* Preset Tags Dropdown */}
        {showPresets && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                Preset Tags
              </p>
              <div className="space-y-1">
                {PRESET_TAGS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      addTag(preset.label);
                      setShowPresets(false);
                    }}
                    disabled={tags.includes(preset.label)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      tags.includes(preset.label)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{preset.icon}</span>
                    <span className="flex-1 text-left text-gray-900 dark:text-gray-100">
                      {preset.label}
                    </span>
                    {tags.includes(preset.label) && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close */}
        {showPresets && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowPresets(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
