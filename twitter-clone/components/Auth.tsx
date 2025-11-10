
import React, { useState } from 'react';
import { Twitter } from 'lucide-react';
import type { User } from '../types';

interface AuthProps {
    onLogin: (identifier: string, pass: string) => boolean;
    onSignUp: (userData: Omit<User, 'id' | 'avatarUrl'>) => User | { error: string };
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignUp }) => {
    const [view, setView] = useState<'landing' | 'login' | 'signup' | 'otp'>('landing');

    // Login state
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // SignUp state
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupHandle, setSignupHandle] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const [newUser, setNewUser] = useState<User | null>(null);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        const success = onLogin(loginIdentifier, loginPassword);
        if (!success) {
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError('');
        const result = onSignUp({ 
            name: signupName, 
            emailOrPhone: signupEmail, 
            handle: signupHandle,
            password: signupPassword 
        });

        if ('error' in result) {
            setSignupError(result.error);
        } else {
            setNewUser(result);
            setView('otp');
        }
    };
    
    const handleOtpVerify = () => {
        // This is a simulation. In a real app, you'd verify the code.
        if(newUser) {
            onLogin(newUser.handle, newUser.password || '');
        }
    };

    const renderLanding = () => (
        <div className="flex w-full max-w-4xl">
            <div className="w-1/2 flex items-center justify-center p-12">
                <Twitter size={250} className="text-white"/>
            </div>
            <div className="w-1/2 p-12 flex flex-col justify-center">
                 <h1 className="text-6xl font-extrabold mb-4">Happening now</h1>
                 <h2 className="text-3xl font-bold mb-8">Join today.</h2>

                 <button className="w-full max-w-xs bg-white text-black font-semibold py-2.5 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-200 transition">
                     <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.618-3.657-11.283-8.591l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.988,36.213,44,30.778,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                     <span>Sign up with Google</span>
                 </button>
                 <button className="mt-4 w-full max-w-xs bg-white text-black font-semibold py-2.5 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-200 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M12.031 6.558c-.99 0-2.23.633-3.15 1.706-.96.99-1.633 2.23-1.633 3.476 0 .23.01.44.03.65h4.753v-5.832zm5.32 10.95c.84-.8 1.323-1.89 1.323-3.14 0-1.28-.513-2.45-1.393-3.32-.9-.89-2.12-1.423-3.53-1.423-.27 0-.53.03-.78.08-.42-.04-.84-.06-1.28-.06-1.42 0-2.73.55-3.69 1.55-.98.98-1.543 2.3-1.543 3.69 0 2.22 1.413 4.22 3.86 4.22.95 0 1.83-.35 2.58-1.02.7-.63 1.12-1.5.18-2.45h-2.76v-1.63h4.6c.03.18.04.36.04.54 0 .61-.15 1.2-.42 1.74zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
                     <span>Sign up with Apple</span>
                 </button>

                 <div className="flex items-center my-4 max-w-xs">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                 </div>

                 <button onClick={() => setView('signup')} className="w-full max-w-xs bg-primary text-white font-bold py-2.5 px-4 rounded-full hover:bg-primary/90 transition">
                     Create account
                 </button>

                 <p className="text-xs text-on-surface-secondary mt-2 max-w-xs">
                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                 </p>

                 <div className="mt-12 max-w-xs">
                     <h3 className="font-bold mb-4">Already have an account?</h3>
                     <button onClick={() => setView('login')} className="w-full bg-transparent border border-on-surface-secondary text-primary font-bold py-2.5 px-4 rounded-full hover:bg-primary/10 transition">
                         Sign in
                     </button>
                 </div>
            </div>
        </div>
    );
    
    const renderLogin = () => (
         <div className="w-full max-w-sm p-8 space-y-8">
            <div className="text-center">
                <Twitter size={40} className="mx-auto text-primary" />
                <h1 className="mt-4 text-3xl font-bold">Log in to Twitter</h1>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
                <input
                    type="text"
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="Phone, email, or username"
                    className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <button type="submit" className="w-full bg-on-surface text-background font-bold py-3 rounded-full hover:bg-white/90 transition-colors">
                    Login
                </button>
                 <div className="text-center text-sm">
                    <a href="#" className="text-primary hover:underline">Forgot password?</a>
                    <span className="mx-2 text-on-surface-secondary">·</span>
                    <button type="button" onClick={() => setView('signup')} className="text-primary hover:underline">Sign up for Twitter</button>
                </div>
            </form>
        </div>
    );
    
    const renderSignUp = () => (
        <div className="w-full max-w-sm p-8 space-y-6 bg-surface rounded-2xl">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={signupName} onChange={e => setSignupName(e.target.value)} required className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" placeholder="Username" value={signupHandle} onChange={e => setSignupHandle(e.target.value)} required className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary/90 transition-colors">Sign Up</button>
            </form>
             <p className="text-center text-sm">Have an account already? <button onClick={() => setView('login')} className="text-primary hover:underline">Log in</button></p>
        </div>
    );

    const renderOtp = () => (
        <div className="w-full max-w-sm p-8 space-y-6 text-center">
            <h1 className="text-2xl font-bold">We sent you a code</h1>
            <p>Enter it below to verify {newUser?.emailOrPhone}.</p>
            <input type="text" maxLength={6} placeholder="_ _ _ _ _ _" className="w-full bg-background border border-surface-2 rounded-md px-4 py-3 text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-primary"/>
            <button onClick={handleOtpVerify} className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary/90 transition-colors">Verify</button>
        </div>
    );

    switch(view) {
        case 'landing': return renderLanding();
        case 'login': return renderLogin();
        case 'signup': return renderSignUp();
        case 'otp': return renderOtp();
        default: return renderLanding();
    }
};

export default Auth;
