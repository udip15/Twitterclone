import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AppContext } from '../App';

const RightSidebar = () => {
  const { searchQuery, onSearch } = useContext(AppContext);
  const trends = [
    { category: 'Tech', topic: 'React 19', tweets: '15.2K' },
    { category: 'AI', topic: 'Gemini API', tweets: '22.7K' },
    { category: 'Web Development', topic: '#TailwindCSS', tweets: '11K' },
    { category: 'Programming', topic: 'TypeScript 5.5', tweets: '8,992' },
  ];

  const suggestions = [
    { name: 'Vercel', handle: 'vercel', avatarUrl: 'https://i.pravatar.cc/150?u=vercel' },
    { name: 'GitHub', handle: 'github', avatarUrl: 'https://i.pravatar.cc/150?u=github' },
    { name: 'Stripe', handle: 'stripe', avatarUrl: 'https://i.pravatar.cc/150?u=stripe' },
  ];

  return (
    <aside className="w-[350px] p-4 hidden lg:block">
      <div className="sticky top-0 py-2 bg-background">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-secondary" size={20} />
          <input
            type="text"
            placeholder="Search ChirpStream"
            className="w-full bg-surface pl-10 pr-4 py-2.5 rounded-full text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 bg-surface rounded-2xl">
        <h2 className="text-xl font-bold p-4">What's happening</h2>
        {trends.map((trend) => (
          <div key={trend.topic} className="p-4 hover:bg-surface-2/50 transition-colors duration-200 cursor-pointer">
            <p className="text-sm text-on-surface-secondary">{trend.category} · Trending</p>
            <p className="font-bold">{trend.topic}</p>
            <p className="text-sm text-on-surface-secondary">{trend.tweets} Chirps</p>
          </div>
        ))}
         <div className="p-4 text-primary hover:bg-surface-2/50 transition-colors duration-200 cursor-pointer rounded-b-2xl">
            Show more
        </div>
      </div>

      <div className="mt-4 bg-surface rounded-2xl">
        <h2 className="text-xl font-bold p-4">Who to follow</h2>
        {suggestions.map((user) => (
          <Link to={`/profile/${user.handle}`} key={user.handle} className="p-4 flex items-center justify-between hover:bg-surface-2/50 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center space-x-3">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-bold hover:underline">{user.name}</p>
                <p className="text-on-surface-secondary">@{user.handle}</p>
              </div>
            </div>
            <button className="bg-on-surface text-background font-bold px-4 py-1.5 rounded-full text-sm">
              Follow
            </button>
          </Link>
        ))}
         <div className="p-4 text-primary hover:bg-surface-2/50 transition-colors duration-200 cursor-pointer rounded-b-2xl">
            Show more
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;