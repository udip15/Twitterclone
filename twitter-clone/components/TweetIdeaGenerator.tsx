
import React, { useState, useCallback } from 'react';
import { generateTweetIdeas } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

interface TweetIdeaGeneratorProps {
  onSelectIdea: (idea: string) => void;
}

const TweetIdeaGenerator: React.FC<TweetIdeaGeneratorProps> = ({ onSelectIdea }) => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    setIdeas([]);
    try {
      const result = await generateTweetIdeas(topic);
      setIdeas(result);
    } catch (err) {
      setError('Failed to generate ideas. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [topic]);

  return (
    <div className="p-4 bg-surface rounded-2xl border border-surface-2">
      <h3 className="font-bold text-lg flex items-center"><Sparkles className="text-primary mr-2"/>AI Idea Generator</h3>
      <div className="flex space-x-2 mt-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., 'React hooks')"
          className="flex-1 bg-background border border-surface-2 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-primary text-white font-bold px-4 py-2 rounded-full disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {ideas.length > 0 && (
        <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Suggestions:</h4>
            <ul className="list-disc list-inside space-y-2">
                {ideas.map((idea, index) => (
                    <li key={index}
                        onClick={() => onSelectIdea(idea)}
                        className="cursor-pointer hover:text-primary transition-colors p-2 rounded-md hover:bg-surface-2/50"
                    >
                        {idea}
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default TweetIdeaGenerator;
