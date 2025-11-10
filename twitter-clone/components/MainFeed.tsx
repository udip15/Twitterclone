
import React, { useContext } from 'react';
import { AppContext } from '../App';
import CreateTweet from './CreateTweet';
import TweetCard from './TweetCard';

const MainFeed: React.FC = () => {
    const { tweets } = useContext(AppContext);

    return (
        <div>
            <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 px-4 py-3 border-b border-surface-2">
                <h1 className="text-xl font-bold">Home</h1>
            </div>
            <CreateTweet />
            <div className="border-t border-surface-2">
                {tweets.map(tweet => (
                    <TweetCard key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    );
};

export default MainFeed;
