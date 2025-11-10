import React, { useContext, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppContext } from '../App';
import TweetCard from './TweetCard';

const ProfilePage: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const { users, tweets, currentUser } = useContext(AppContext);
    const navigate = useNavigate();

    const user = useMemo(() => users.find(u => u.handle === handle), [users, handle]);
    const userTweets = useMemo(() => tweets.filter(t => t.user.handle === handle), [tweets, handle]);

    if (!user) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">User not found</h2>
                <p className="text-on-surface-secondary">This account doesn’t exist. Try searching for another.</p>
            </div>
        );
    }
    
    const isCurrentUserProfile = currentUser?.handle === user.handle;

    return (
        <div>
            <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 px-4 py-2 flex items-center space-x-4 border-b border-surface-2">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-2">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold">{user.name}</h1>
                    <p className="text-sm text-on-surface-secondary">{userTweets.length} Chirps</p>
                </div>
            </div>

            <div>
                <div className="h-52 bg-surface-2 relative">
                    {user.bannerUrl && <img src={user.bannerUrl} alt={`${user.name}'s banner`} className="w-full h-full object-cover" />}
                </div>
                <div className="p-4 -mt-20">
                    <div className="flex justify-between items-end">
                        <div className="w-36 h-36 rounded-full bg-background border-4 border-background overflow-hidden relative">
                             <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="w-full h-full object-cover" />
                        </div>
                        {isCurrentUserProfile ? (
                            <button className="font-bold border border-on-surface-secondary rounded-full px-4 py-1.5 hover:bg-surface-2 transition-colors">
                                Edit profile
                            </button>
                        ) : (
                             <button className="font-bold bg-on-surface text-background rounded-full px-4 py-1.5 hover:bg-on-surface/90 transition-colors">
                                Follow
                            </button>
                        )}
                    </div>

                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-on-surface-secondary">@{user.handle}</p>
                    </div>

                    <div className="mt-3">
                        <p>{user.bio}</p>
                    </div>

                    <div className="flex space-x-4 mt-3 text-on-surface-secondary">
                        <p><span className="font-bold text-on-surface">{user.followingCount || 0}</span> Following</p>
                        <p><span className="font-bold text-on-surface">{user.followerCount || 0}</span> Followers</p>
                    </div>
                </div>
            </div>
            
             <div className="border-b border-surface-2">
                <div className="flex justify-around">
                    {['Tweets', 'Replies', 'Media', 'Likes'].map(tab => (
                        <div key={tab} className={`py-3 font-semibold ${tab === 'Tweets' ? 'text-on-surface border-b-4 border-primary' : 'text-on-surface-secondary'} hover:bg-surface-2/50 cursor-pointer`}>
                           {tab}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {userTweets.map(tweet => (
                    <TweetCard key={tweet.id} tweet={tweet} />
                ))}
            </div>

        </div>
    );
};

export default ProfilePage;
