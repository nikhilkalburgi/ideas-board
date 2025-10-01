/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ArrowLeft, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { fetchIdeas, createIdea, upvoteIdea } from "@/api/graphql";

interface Idea {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
}

const IdeaBoard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load ideas from API on mount
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        const fetchedIdeas = await fetchIdeas();
        console.log(fetchedIdeas);
        setIdeas(fetchedIdeas);
      } catch (error) {
        toast({
          title: "Error loading ideas",
          description: error instanceof Error ? error.message : "Failed to load ideas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newIdea.trim().length === 0) {
      toast({
        title: "Idea cannot be empty",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (newIdea.length > 280) {
      toast({
        title: "Idea too long",
        description: "Please keep your idea under 280 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      const idea = await createIdea(newIdea.trim());
      setIdeas([idea, ...ideas]);
      setNewIdea("");
      
      toast({
        title: "Idea shared!",
        description: "Your brilliant idea has been added to the board.",
      });
    } catch (error) {
      toast({
        title: "Failed to share idea",
        description: error instanceof Error ? error.message : "An error occurred while sharing your idea",
        variant: "destructive",
      });
    }
  };

  const handleUpvote = async (id: string) => {
    try {
      const updatedIdea = await upvoteIdea(id);
      setIdeas(ideas.map(idea => 
        idea.id === id ? updatedIdea : idea
      ));
    } catch (error) {
      toast({
        title: "Failed to upvote",
        description: error instanceof Error ? error.message : "An error occurred while upvoting",
        variant: "destructive",
      });
    }
  };

  const sortedIdeas = [...ideas].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary animate-glow" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                The Idea Board
              </h1>
            </div>
            <p className="text-muted-foreground">
              Share your ideas and upvote your favorites
            </p>
          </div>
        </div>

        {/* Idea Input Form */}
        <div className="mb-12">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
            <Textarea
              placeholder="What's your brilliant idea? (max 280 characters)"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              maxLength={280}
              className="min-h-[120px] bg-white/50 border-white/30 focus:bg-white/70 transition-colors mb-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {newIdea.length}/280 characters
              </span>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
              >
                Share Idea
              </Button>
            </div>
          </form>
        </div>

        {/* Ideas Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            All Ideas ({ideas.length})
          </h2>
          
          {sortedIdeas.length === 0 ? (
            <div className="text-center py-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">No ideas yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedIdeas.map((idea, index) => (
                <div
                  key={idea.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpvote(idea.id)}
                        className="rounded-full hover:scale-110 transition-transform bg-white/50 hover:bg-primary hover:text-white border-white/30"
                      >
                        <ArrowUp className="w-5 h-5" />
                      </Button>
                      <span className="font-bold text-lg">{idea.upvotes}</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed">{idea.text}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(parseInt(idea.createdAt)).toLocaleDateString()} at {new Date(parseInt(idea.createdAt)).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaBoard;