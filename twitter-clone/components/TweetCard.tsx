import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import type { Tweet, Comment } from '../types';
import { MessageCircle, Repeat, Heart, Upload } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AppContext } from '../App';

interface TweetCardProps {
  tweet: Tweet;
}

const CommentInput: React.FC<{ tweetId: string, onComment: () => void }> = ({ tweetId, onComment }) => {
    const { currentUser, addComment } = useContext(AppContext);
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!content.trim() || !currentUser) return;
        addComment(tweetId, content);
        setContent('');
        onComment();
    };

    if (!currentUser) return null;
    
    return (
        <form onSubmit={handleSubmit} className="flex space-x-3 p-4 border-t border-surface-2">
            <img src={currentUser.avatarUrl} alt="Your avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Post your reply"
                    className="w-full bg-surface rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <button type="submit" disabled={!content.trim()} className="bg-primary text-white font-bold px-6 py-2 rounded-full disabled:opacity-50">
                Reply
            </button>
        </form>
    )
}

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="p-4 flex space-x-3 border-t border-surface-2">
        <Link to={`/profile/${comment.user.handle}`}>
            <img src={comment.user.avatarUrl} alt={`${comment.user.name}'s avatar`} className="w-10 h-10 rounded-full flex-shrink-0" />
        </Link>
        <div className="flex-1">
             <div className="flex items-center space-x-2">
                <Link to={`/profile/${comment.user.handle}`} className="font-bold hover:underline">{comment.user.name}</Link>
                <Link to={`/profile/${comment.user.handle}`} className="text-on-surface-secondary">@{comment.user.handle}</Link>
                <span className="text-on-surface-secondary">·</span>
                <p className="text-on-surface-secondary">{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</p>
            </div>
            <p className="mt-1">{comment.content}</p>
        </div>
    </div>
)


const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const { user, content, imageUrl, timestamp, stats, comments } = tweet;
  const { likedTweets, toggleLike } = useContext(AppContext);
  const [isReplying, setIsReplying] = useState(false);

  const isLiked = likedTweets.has(tweet.id);

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const formatStat = (num: number) => {
    if (num > 9999) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    if (num > 999) {
      return `${(num / 1000).toFixed(1).replace('.0', '')}K`;
    }
    return num;
  };

  const TweetAction: React.FC<{ 
    icon: React.ReactNode, 
    value: number,
    groupHoverColor: string,
    textColor: string,
    onClick?: (e: React.MouseEvent) => void
  }> = ({ icon, value, groupHoverColor, textColor, onClick }) => (
      <button onClick={onClick} className={`flex items-center space-x-2 ${textColor} group`}>
          <div className={`p-2 rounded-full ${groupHoverColor} transition-colors duration-200`}>
             {icon}
          </div>
          <span className="text-sm">{formatStat(value)}</span>
      </button>
  );

  return (
    <>
    <article className="p-4 border-b border-surface-2 flex space-x-4 hover:bg-surface-2/20 transition-colors duration-200 cursor-pointer">
      <Link to={`/profile/${user.handle}`} onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="w-12 h-12 rounded-full" />
      </Link>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
            <Link to={`/profile/${user.handle}`} onClick={(e) => e.stopPropagation()} className="font-bold hover:underline">{user.name}</Link>
            <Link to={`/profile/${user.handle}`} onClick={(e) => e.stopPropagation()} className="text-on-surface-secondary">@{user.handle}</Link>
          <span className="text-on-surface-secondary">·</span>
          <p className="text-on-surface-secondary hover:underline">{timeAgo}</p>
        </div>
        <p className="mt-1 whitespace-pre-wrap">{content}</p>
        {imageUrl && (
          <div className="mt-3">
            <img src={imageUrl} alt="Tweet media" className="rounded-2xl border border-surface-2 w-full object-cover max-h-96" />
          </div>
        )}
        <div className="flex justify-between mt-4 max-w-sm">
            <TweetAction 
                icon={<MessageCircle size={18} />} 
                value={stats.comments} 
                textColor="text-on-surface-secondary group-hover:text-primary"
                groupHoverColor="group-hover:bg-primary/10"
                onClick={(e) => { e.stopPropagation(); setIsReplying(!isReplying); }}
            />
            <TweetAction 
                icon={<Repeat size={18} />} 
                value={stats.retweets}
                textColor="text-on-surface-secondary group-hover:text-green-500"
                groupHoverColor="group-hover:bg-green-500/10"
                onClick={(e) => e.stopPropagation()}
            />
            <TweetAction 
                icon={<Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />} 
                value={stats.likes}
                textColor={isLiked ? 'text-pink-500' : 'text-on-surface-secondary group-hover:text-pink-500'}
                groupHoverColor="group-hover:bg-pink-500/10"
                onClick={(e) => { e.stopPropagation(); toggleLike(tweet.id); }}
            />
            <TweetAction 
                icon={<Upload size={18} />} 
                value={0}
                textColor="text-on-surface-secondary group-hover:text-primary"
                groupHoverColor="group-hover:bg-primary/10"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
      </div>
    </article>
    {isReplying && (
        <div className="border-b border-surface-2">
            {comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
            <CommentInput tweetId={tweet.id} onComment={() => { /* could add logic here */}} />
        </div>
    )}
    </>
  );
};

export default TweetCard;