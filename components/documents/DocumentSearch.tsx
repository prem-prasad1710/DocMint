'use client';

import { useState, useMemo } from 'react';

interface Document {
  _id: string;
  documentTitle: string;
  documentType: string;
  generatedContent: string;
  createdAt: Date;
  isSaved: boolean;
}

interface DocumentSearchProps {
  documents: Document[];
  onResultsChange: (results: Document[]) => void;
}

export function DocumentSearch({ documents, onResultsChange }: DocumentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter and search documents
  const filteredDocuments = useMemo(() => {
    let results = [...documents];

    // Apply text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(doc => 
        doc.documentTitle.toLowerCase().includes(query) ||
        doc.documentType.toLowerCase().includes(query) ||
        doc.generatedContent.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filters.type !== 'all') {
      results = results.filter(doc => doc.documentType === filters.type);
    }

    // Apply status filter
    if (filters.status === 'saved') {
      results = results.filter(doc => doc.isSaved);
    } else if (filters.status === 'unsaved') {
      results = results.filter(doc => !doc.isSaved);
    }

    // Apply date filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      if (filters.dateRange === 'today') {
        filterDate.setHours(0, 0, 0, 0);
      } else if (filters.dateRange === 'week') {
        filterDate.setDate(now.getDate() - 7);
      } else if (filters.dateRange === 'month') {
        filterDate.setMonth(now.getMonth() - 1);
      }

      results = results.filter(doc => new Date(doc.createdAt) >= filterDate);
    }

    return results;
  }, [documents, searchQuery, filters]);

  // Update parent component when results change
  useMemo(() => {
    onResultsChange(filteredDocuments);
  }, [filteredDocuments, onResultsChange]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      type: 'all',
      status: 'all',
      dateRange: 'all',
    });
  };

  const hasActiveFilters = searchQuery || filters.type !== 'all' || filters.status !== 'all' || filters.dateRange !== 'all';

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents by title, type, or content..."
          className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            showAdvanced
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </span>
        </button>

        {hasActiveFilters && (
          <>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredDocuments.length} results
            </span>
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="glass-card p-4 space-y-4 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Document Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Document Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="contract">Contract</option>
                <option value="nda">NDA</option>
                <option value="invoice">Invoice</option>
                <option value="proposal">Proposal</option>
                <option value="quotation">Quotation</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="saved">Saved</option>
                <option value="unsaved">Unsaved</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active filters:
              </span>
              {searchQuery && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
              {filters.type !== 'all' && (
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full">
                  Type: {filters.type}
                </span>
              )}
              {filters.status !== 'all' && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded-full">
                  Status: {filters.status}
                </span>
              )}
              {filters.dateRange !== 'all' && (
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 rounded-full">
                  Date: {filters.dateRange}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search Suggestions */}
      {!searchQuery && !hasActiveFilters && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <span>💡</span>
            <span>Try searching for document titles, types, or content keywords</span>
          </p>
        </div>
      )}
    </div>
  );
}
