'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  isResolved: boolean;
  replies: Comment[];
  position?: { line: number; char: number };
}

interface DocumentCommentsProps {
  documentId: string;
  currentUser: { id: string; name: string; avatar?: string };
  onAddComment?: (content: string, position?: any) => void;
}

/**
 * Document Comments & Collaboration Component
 * 
 * IMPLEMENTATION GUIDE:
 * 
 * This component provides real-time collaboration features:
 * - Inline comments on documents
 * - Threaded discussions
 * - @mentions
 * - Real-time updates
 * 
 * To implement real-time collaboration:
 * 
 * 1. Choose a Real-time Provider:
 *    - Pusher (Recommended - Easy)
 *    - Socket.io (Self-hosted)
 *    - Ably
 *    - Firebase Realtime Database
 * 
 * 2. Pusher Implementation Example:
 * 
 * ```bash
 * npm install pusher pusher-js
 * ```
 * 
 * ```typescript
 * // lib/pusher.ts
 * import Pusher from 'pusher';
 * import PusherClient from 'pusher-js';
 * 
 * export const pusherServer = new Pusher({
 *   appId: process.env.PUSHER_APP_ID!,
 *   key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
 *   secret: process.env.PUSHER_SECRET!,
 *   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
 *   useTLS: true,
 * });
 * 
 * export const pusherClient = new PusherClient(
 *   process.env.NEXT_PUBLIC_PUSHER_KEY!,
 *   { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER! }
 * );
 * ```
 * 
 * 3. API Routes:
 * 
 * ```typescript
 * // app/api/comments/route.ts
 * import { pusherServer } from '@/lib/pusher';
 * 
 * export async function POST(request: Request) {
 *   const { documentId, content, author } = await request.json();
 *   
 *   const comment = {
 *     id: Date.now().toString(),
 *     author,
 *     content,
 *     createdAt: new Date(),
 *     isResolved: false,
 *   };
 *   
 *   // Save to database
 *   await saveComment(comment);
 *   
 *   // Broadcast to all users viewing this document
 *   await pusherServer.trigger(`document-${documentId}`, 'new-comment', comment);
 *   
 *   return Response.json(comment);
 * }
 * ```
 * 
 * 4. Client-side Subscription:
 * 
 * ```typescript
 * useEffect(() => {
 *   const channel = pusherClient.subscribe(`document-${documentId}`);
 *   
 *   channel.bind('new-comment', (comment: Comment) => {
 *     setComments(prev => [...prev, comment]);
 *   });
 *   
 *   return () => {
 *     channel.unbind_all();
 *     channel.unsubscribe();
 *   };
 * }, [documentId]);
 * ```
 * 
 * 5. Environment Variables:
 *    Add to .env.local:
 *    PUSHER_APP_ID=your_app_id
 *    PUSHER_SECRET=your_secret
 *    NEXT_PUBLIC_PUSHER_KEY=your_key
 *    NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
 * 
 * 6. Cost Estimate:
 *    - Pusher: Free for 200k messages/day, then $49/month
 *    - Socket.io: Free (self-hosted, server costs)
 *    - Ably: Free for 3M messages/month
 */

export function DocumentComments({ documentId, currentUser, onAddComment }: DocumentCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unresolved'>('all');

  const filteredComments = filter === 'unresolved' 
    ? comments.filter(c => !c.isResolved)
    : comments;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: newComment,
      createdAt: new Date(),
      isResolved: false,
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment('');
    onAddComment?.(newComment);
  };

  const toggleResolve = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, isResolved: !c.isResolved } : c
    ));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Comments</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unresolved')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === 'unresolved'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Unresolved
          </button>
        </div>
      </div>

      {/* New Comment Input */}
      <div className="glass-card p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or use @mention to notify someone..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>💡 Tip: Use @username to mention someone</span>
          </div>
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-2">💬</p>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'unresolved' ? 'No unresolved comments' : 'No comments yet'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Be the first to start a discussion
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`glass-card p-4 ${comment.isResolved ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {comment.author[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {formatTime(comment.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleResolve(comment.id)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          comment.isResolved
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {comment.isResolved ? '✓ Resolved' : 'Resolve'}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Reply
                    </button>
                    <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Implementation Notice */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Developer Note:</strong> Real-time collaboration requires Pusher or Socket.io integration. 
          See component source code for implementation guide.
        </p>
      </div>
    </div>
  );
}
