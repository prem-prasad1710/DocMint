'use client';

import { useState } from 'react';

interface DocumentVersion {
  id: string;
  version: number;
  content: string;
  createdAt: Date;
  createdBy: string;
  changesSummary: string;
  size: number;
}

interface VersionHistoryProps {
  documentId: string;
  currentVersion: DocumentVersion;
  versions?: DocumentVersion[];
  onRestore?: (versionId: string) => void;
}

export function VersionHistory({ documentId, currentVersion, versions = [], onRestore }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  // Mock versions for demonstration (in production, these would come from the database)
  const allVersions = [currentVersion, ...versions];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const getTimeDiff = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleRestore = (version: DocumentVersion) => {
    if (confirm(`Restore document to version ${version.version}? This will create a new version with the restored content.`)) {
      onRestore?.(version.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Version History</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {allVersions.length} version{allVersions.length !== 1 ? 's' : ''} • Current: v{currentVersion.version}
          </p>
        </div>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            showDiff
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {showDiff ? 'Hide' : 'Show'} Changes
        </button>
      </div>

      {/* Version Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Versions List */}
        <div className="space-y-4">
          {allVersions.map((version, index) => (
            <div
              key={version.id}
              className={`relative pl-12 group ${
                selectedVersion?.id === version.id ? 'bg-blue-50 dark:bg-blue-900/20 -ml-4 pl-16 pr-4 py-2 rounded-lg' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-3.5 w-3 h-3 rounded-full border-2 ${
                  index === 0
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                }`}
              />

              {/* Version Card */}
              <div
                className="cursor-pointer"
                onClick={() => setSelectedVersion(selectedVersion?.id === version.id ? null : version)}
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <span className="inline-flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Version {version.version}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded-full">
                          Current
                        </span>
                      )}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {version.createdBy} • {getTimeDiff(version.createdAt)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatSize(version.size)}
                  </span>
                </div>

                {/* Changes Summary */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {version.changesSummary}
                </p>

                {/* Expanded Details */}
                {selectedVersion?.id === version.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3 animate-slide-up">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>📅 {formatDate(version.createdAt)}</span>
                      <span>•</span>
                      <span>👤 {version.createdBy}</span>
                    </div>

                    {showDiff && index < allVersions.length - 1 && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Changes from previous version:</p>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="text-green-600 dark:text-green-400">+ Added new clauses</div>
                          <div className="text-red-600 dark:text-red-400">- Removed outdated sections</div>
                          <div className="text-blue-600 dark:text-blue-400">~ Modified payment terms</div>
                        </div>
                      </div>
                    )}

                    {index !== 0 && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRestore(version)}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          Restore this version
                        </button>
                        <button
                          onClick={() => {
                            // Download version logic here
                            alert('Downloading version ' + version.version);
                          }}
                          className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-1">Version History Tips</p>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
              <li>• Versions are automatically saved when you edit a document</li>
              <li>• You can restore any previous version to continue from that point</li>
              <li>• Restoring creates a new version, so you never lose history</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
