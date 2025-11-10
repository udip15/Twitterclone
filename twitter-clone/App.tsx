import React, { useState, createContext, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainFeed from './components/MainFeed';
import Auth from './components/Auth';
import ProfilePage from './components/ProfilePage';
import type { User, Tweet, Comment } from './types';

// Mock data
const MOCK_USERS_DATA: User[] = [
  {
    id: 'user-1',
    name: 'Dave Rogers',
    handle: 'dev_dave',
    avatarUrl: 'https://i.pravatar.cc/150?u=dev_dave',
    emailOrPhone: 'dave@example.com',
    password: 'password123',
    bio: 'Frontend Developer | React & TypeScript enthusiast. Turning coffee into clean code. 🚀',
    bannerUrl: 'https://picsum.photos/seed/dave_banner/1500/500',
    followingCount: 150,
    followerCount: 2500,
  },
  {
    id: 'user-2',
    name: 'React Dev',
    handle: 'reactdev',
    avatarUrl: 'https://i.pravatar.cc/150?u=reactdev',
    emailOrPhone: 'react@example.com',
    password: 'password',
    bio: 'Official news and updates from the React team. Building user interfaces for the web.',
    bannerUrl: 'https://picsum.photos/seed/react_banner/1500/500',
    followingCount: 1,
    followerCount: 500000,
  },
  {
    id: 'user-3',
    name: 'Explore Nepal',
    handle: 'explorenepal',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/188px-Flag_of_Nepal.svg.png',
    emailOrPhone: 'nepal@example.com',
    password: 'password',
    bio: 'Discover the beauty of Nepal. From the highest peaks to the ancient temples. 🇳🇵 #VisitNepal',
    bannerUrl: 'https://picsum.photos/seed/nepal_banner/1500/500',
    followingCount: 50,
    followerCount: 12000,
  },
   {
    id: 'user-4',
    name: 'CSS Wizard',
    handle: 'css_master',
    avatarUrl: 'https://i.pravatar.cc/150?u=css_master',
    emailOrPhone: 'css@example.com',
    password: 'password',
    bio: 'Making the web a more beautiful place, one style at a time. CSS, animations, and UI design.',
    bannerUrl: 'https://picsum.photos/seed/css_banner/1500/500',
    followingCount: 300,
    followerCount: 42000,
  },
];

const INITIAL_TWEETS: Tweet[] = [
    {
        id: 'tweet-np-1',
        user: MOCK_USERS_DATA[2],
        content: "Just trekked to Everest Base Camp. The views are out of this world! Truly a once-in-a-lifetime experience. #Nepal #Himalayas #Everest",
        imageUrl: "https://picsum.photos/seed/everest/600/400",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        stats: { comments: 45, retweets: 120, likes: 1500 },
        comments: [],
    },
    {
        id: 'tweet-code-1',
        user: MOCK_USERS_DATA[0],
        content: "Refactoring legacy code is like being a detective. You uncover so many mysteries and hidden gems. #coding #developerlife",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        stats: { comments: 22, retweets: 40, likes: 250 },
        comments: [],
    },
    {
        id: 'tweet-np-2',
        user: MOCK_USERS_DATA[2],
        content: "Can never have too many momos. What's your favorite dipping sauce? Mine is the classic tomato achar. #momo #nepalifood #foodie",
        imageUrl: "https://picsum.photos/seed/momo/600/400",
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        stats: { comments: 60, retweets: 95, likes: 980 },
        comments: [],
    },
    {
        id: 'tweet-np-3',
        user: MOCK_USERS_DATA[2],
        content: "Update: Traffic congestion reported near Thapathali, Kathmandu due to ongoing road work. Commuters are advised to take alternative routes. #KathmanduTraffic #NepalNews",
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        stats: { comments: 10, retweets: 55, likes: 150 },
        comments: [],
    },
    {
        id: 'tweet-react-1',
        user: MOCK_USERS_DATA[1],
        content: "Excited about the new features in React 19. The automatic batching is going to be a game-changer for performance.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        stats: { comments: 15, retweets: 60, likes: 420 },
        comments: [],
    },
    {
        id: 'tweet-np-4',
        user: MOCK_USERS_DATA[2],
        content: "Phewa Lake in Pokhara at dawn is a slice of heaven. The reflection of Machapuchare on the water is just magical. #Pokhara #Nepal #Nature",
        imageUrl: "https://picsum.photos/seed/pokhara/600/400",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        stats: { comments: 33, retweets: 150, likes: 2200 },
        comments: [],
    },
    {
        id: 'tweet-css-1',
        user: MOCK_USERS_DATA[3],
        content: "Container queries are finally here and they are as amazing as I'd hoped. Responsive design just got a whole lot easier.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        stats: { comments: 18, retweets: 70, likes: 550 },
        comments: [],
    },
    {
        id: 'tweet-np-5',
        user: MOCK_USERS_DATA[2],
        content: "Exploring the ancient city of Bhaktapur. Every corner tells a story. The woodwork on the temples is incredible! #heritage #nepal #travel",
        imageUrl: "https://picsum.photos/seed/bhaktapur/600/400",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
        stats: { comments: 25, retweets: 80, likes: 1100 },
        comments: [],
    },
     ...Array.from({ length: 15 }).map((_, i) => {
        const user = MOCK_USERS_DATA[i % MOCK_USERS_DATA.length];
        const timestamp = new Date(Date.now() - 1000 * 60 * 60 * (12 + i * 2)).toISOString();
        const tweets = [
            { user: MOCK_USERS_DATA[2], content: 'The stupa at Boudhanath has such a peaceful aura. A must-visit in Kathmandu. #Boudha #Peace', imageUrl: 'https://picsum.photos/seed/boudha/600/400' },
            { user: MOCK_USERS_DATA[0], content: "Finally fixed that bug that's been haunting me for days. The feeling is unbeatable. #100DaysOfCode" },
            { user: MOCK_USERS_DATA[2], content: 'Dal Bhat Power, 24 Hour! This is not just food, it\'s the fuel of Nepal. #DalBhat #NepaleseCuisine' },
            { user: MOCK_USERS_DATA[1], content: 'Thinking of starting a new side project with Svelte. Anyone has good resources to share?' },
            { user: MOCK_USERS_DATA[2], content: 'Chitwan National Park is teeming with wildlife. Saw a rhino and her calf today! #wildlife #nepal #jungle' , imageUrl: 'https://picsum.photos/seed/rhino/600/400' },
            { user: MOCK_USERS_DATA[3], content: 'Grid vs. Flexbox: which one do you reach for first and why? #CSS #webdev' },
            { user: MOCK_USERS_DATA[2], content: 'Lumbini, the birthplace of Lord Buddha. A place of profound peace and reflection. #Lumbini #Buddhism #Spiritual' },
            { user: MOCK_USERS_DATA[0], content: 'Anyone else find themselves explaining what an API is to their family over dinner?' },
            { user: MOCK_USERS_DATA[2], content: 'Public Service Announcement: Remember to renew your vehicle registration (bluebook) on time to avoid fines. #Nepal #Info' },
            { user: MOCK_USERS_DATA[2], content: 'The winding roads and terraced farms of rural Nepal are a sight to behold. #TravelNepal #Scenery'},
            { user: MOCK_USERS_DATA[1], content: 'Just published a new npm package. Feels good to contribute back to the community.' },
            { user: MOCK_USERS_DATA[2], content: 'Enjoying a hot cup of chiya on a rainy Kathmandu day. Simple pleasures. #Chiya #Rain' },
            { user: MOCK_USERS_DATA[3], content: 'That moment when your CSS aligns perfectly on the first try. #CSSHumor' },
            { user: MOCK_USERS_DATA[2], content: 'Paragliding in Pokhara is an adrenaline rush like no other! Soaring with the eagles. #Adventure #Pokhara' },
            { user: MOCK_USERS_DATA[0], content: 'Git tip: `git rebase -i` is your best friend for cleaning up commit history before a PR.' },
        ];
        const tweet = tweets[i % tweets.length];
        return {
            id: `tweet-gen-${i}`,
            user: tweet.user,
            content: tweet.content,
            imageUrl: tweet.imageUrl,
            timestamp,
            stats: { comments: Math.floor(Math.random() * 50), retweets: Math.floor(Math.random() * 200), likes: Math.floor(Math.random() * 2500) },
            comments: [],
        };
    }),
];


interface AppContextType {
  currentUser: User | null;
  users: User[];
  tweets: Tweet[];
  addTweet: (data: { content: string; imageUrl?: string }) => void;
  likedTweets: Set<string>;
  toggleLike: (tweetId: string) => void;
  addComment: (tweetId: string, content: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS_DATA);
  const [tweets, setTweets] = useState<Tweet[]>(INITIAL_TWEETS);
  const [likedTweets, setLikedTweets] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const login = (identifier: string, pass: string): boolean => {
    const user = users.find(u => (u.handle === identifier || u.emailOrPhone === identifier) && u.password === pass);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signUp = (userData: Omit<User, 'id' | 'avatarUrl'>): User | { error: string } => {
    if (users.some(u => u.handle === userData.handle)) {
      return { error: 'Username is already taken.' };
    }
    if (users.some(u => u.emailOrPhone === userData.emailOrPhone)) {
        return { error: 'Email or phone is already registered.' };
    }
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      avatarUrl: `https://i.pravatar.cc/150?u=${userData.handle}`,
      bio: '',
      bannerUrl: 'https://picsum.photos/seed/new_user_banner/1500/500',
      followerCount: 0,
      followingCount: 0,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const addTweet = useCallback((data: { content: string; imageUrl?: string }) => {
    if (!currentUser) return;
    const newTweet: Tweet = {
      id: `tweet-${Date.now()}`,
      user: currentUser,
      content: data.content,
      imageUrl: data.imageUrl,
      timestamp: new Date().toISOString(),
      stats: { comments: 0, retweets: 0, likes: 0 },
      comments: [],
    };
    setTweets(prevTweets => [newTweet, ...prevTweets]);
  }, [currentUser]);

  const toggleLike = useCallback((tweetId: string) => {
    setTweets(prevTweets => prevTweets.map(tweet => {
      if (tweet.id === tweetId) {
        const isLiked = likedTweets.has(tweetId);
        return {
          ...tweet,
          stats: { ...tweet.stats, likes: isLiked ? tweet.stats.likes - 1 : tweet.stats.likes + 1 },
        };
      }
      return tweet;
    }));

    setLikedTweets(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(tweetId)) {
        newLiked.delete(tweetId);
      } else {
        newLiked.add(tweetId);
      }
      return newLiked;
    });
  }, [likedTweets]);

  const addComment = useCallback((tweetId: string, content: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      content,
      timestamp: new Date().toISOString(),
    };
    setTweets(prevTweets => prevTweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          stats: { ...tweet.stats, comments: tweet.stats.comments + 1 },
          comments: [...tweet.comments, newComment],
        };
      }
      return tweet;
    }));
  }, [currentUser]);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredTweets = useMemo(() => {
    if (!searchQuery.trim()) {
        return tweets;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return tweets.filter(tweet => 
        tweet.content.toLowerCase().includes(lowercasedQuery) ||
        tweet.user.name.toLowerCase().includes(lowercasedQuery) ||
        tweet.user.handle.toLowerCase().includes(lowercasedQuery)
    );
  }, [tweets, searchQuery]);


  if (!currentUser) {
    return (
        <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
            <Auth onLogin={login} onSignUp={signUp} />
        </div>
    );
  }

  return (
    <AppContext.Provider value={{ currentUser, users, tweets: filteredTweets, addTweet, likedTweets, toggleLike, addComment, searchQuery, onSearch }}>
      <Router>
        <div className="bg-background text-on-surface min-h-screen">
          <div className="container mx-auto flex justify-center">
            <LeftSidebar user={currentUser} />
            <main className="w-full max-w-[600px] border-x border-surface-2">
              <Routes>
                <Route path="/" element={<MainFeed />} />
                <Route path="/explore" element={<div className="p-4"><h1 className="text-xl font-bold">Explore</h1></div>} />
                <Route path="/notifications" element={<div className="p-4"><h1 className="text-xl font-bold">Notifications</h1></div>} />
                <Route path="/messages" element={<div className="p-4"><h1 className="text-xl font-bold">Messages</h1></div>} />
                <Route path="/profile/:handle" element={<ProfilePage />} />
                <Route path="/profile" element={<Navigate to={`/profile/${currentUser.handle}`} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <RightSidebar />
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;