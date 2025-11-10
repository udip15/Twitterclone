
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { Image as ImageIcon, Sparkles, X } from 'lucide-react';
import TweetIdeaGenerator from './TweetIdeaGenerator';

const CreateTweet: React.FC = () => {
  const { currentUser, addTweet } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
      setImage(null);
      setImageUrl(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  const handleSubmit = () => {
    if (content.trim() || image) {
      addTweet({ content, imageUrl: imageUrl || undefined });
      setContent('');
      removeImage();
    }
  };

  if (!currentUser) return null;

  return (
    <div className="p-4 border-b border-surface-2">
      <div className="flex space-x-4">
        <img src={currentUser.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl placeholder-on-surface-secondary focus:outline-none resize-none"
            rows={content.length > 50 ? 3 : 1}
          />
          {imageUrl && (
            <div className="relative mt-2">
                <img src={imageUrl} alt="Preview" className="rounded-2xl max-h-80 w-full object-cover"/>
                <button onClick={removeImage} className="absolute top-2 right-2 bg-black/70 p-1.5 rounded-full text-white hover:bg-black">
                    <X size={20}/>
                </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 ml-16">
        <div className="flex space-x-2 text-primary">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full hover:bg-primary/10"
            aria-label="Add image"
          >
            <ImageIcon size={20} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          <button onClick={() => setShowIdeaGenerator(!showIdeaGenerator)} className="p-2 rounded-full hover:bg-primary/10" aria-label="Generate tweet idea">
            <Sparkles size={20} />
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!content.trim() && !image}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-full disabled:opacity-50"
        >
          Chirp
        </button>
      </div>
      {showIdeaGenerator && (
        <div className="ml-16 mt-4">
            <TweetIdeaGenerator onSelectIdea={(idea) => {
                setContent(idea);
                setShowIdeaGenerator(false);
            }} />
        </div>
      )}
    </div>
  );
};

export default CreateTweet;
