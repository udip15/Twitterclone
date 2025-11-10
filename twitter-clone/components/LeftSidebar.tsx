import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Hash, Bell, Mail, User as UserIcon, Twitter } from 'lucide-react';
import type { User } from '../types';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-4 p-3 rounded-full transition-colors duration-200 hover:bg-surface-2 ${
        isActive ? 'font-bold' : ''
      }`
    }
  >
    {icon}
    <span className="hidden xl:inline text-xl">{text}</span>
  </NavLink>
);


interface LeftSidebarProps {
    user: User;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ user }) => {
  return (
    <header className="h-screen sticky top-0 flex flex-col justify-between p-2 xl:p-4 w-[88px] xl:w-[275px]">
      <div>
        <div className="p-3">
            <Link to="/"><Twitter size={30} className="text-primary"/></Link>
        </div>
        <nav className="mt-4 space-y-2">
            <NavItem to="/" icon={<Home size={26} />} text="Home" />
            <NavItem to="/explore" icon={<Hash size={26} />} text="Explore" />
            <NavItem to="/notifications" icon={<Bell size={26} />} text="Notifications" />
            <NavItem to="/messages" icon={<Mail size={26} />} text="Messages" />
            <NavItem to={`/profile/${user.handle}`} icon={<UserIcon size={26} />} text="Profile" />
        </nav>
        <button className="mt-6 w-full bg-primary text-white font-bold py-3 px-6 rounded-full text-lg hidden xl:block hover:bg-primary/90 transition-colors duration-200">
            Chirp
        </button>
         <button className="mt-6 w-14 h-14 bg-primary text-white font-bold rounded-full text-lg flex items-center justify-center xl:hidden hover:bg-primary/90 transition-colors duration-200">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current"><g><path d="M23 3c-1.1.5-2.3.8-3.5.9h.1c1.2-.7 2.2-1.9 2.6-3.3-1.1.7-2.4 1.1-3.7 1.4-1.1-1.2-2.6-1.9-4.2-1.9-3.2 0-5.8 2.6-5.8 5.8 0 .5.1.9.1 1.3-4.8-.2-9.1-2.5-12-6.1-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.9-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.2 4.6 5.7-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 4 5.4 4-2 1.6-4.5 2.5-7.2 2.5-.5 0-.9 0-1.4-.1 2.6 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3 0-.2 0-.5 0-.7 1.1-.8 2.1-1.8 2.8-2.9z"></path></g></svg>
        </button>
      </div>

      <Link to={`/profile/${user.handle}`} className="p-3 rounded-full hover:bg-surface-2 cursor-pointer transition-colors duration-200">
        <div className="flex items-center space-x-3">
          <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div className="hidden xl:inline">
            <p className="font-bold text-on-surface">{user.name}</p>
            <p className="text-on-surface-secondary">@{user.handle}</p>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default LeftSidebar;