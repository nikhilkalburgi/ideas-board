import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Zap, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 shadow-lg">
              <Lightbulb className="w-5 h-5 text-primary animate-glow" />
              <span className="text-sm font-medium">Where Ideas Come to Life</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            The Idea Board
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Share your brilliant ideas, upvote the best ones, and watch creativity flourish in real-time.
          </p>

          <div className="pt-8">
            <Link to="/app">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary">
                Start Sharing Ideas
                <Zap className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Spark Creativity</h3>
              <p className="text-muted-foreground">
                Share your ideas instantly with a simple, intuitive interface designed for creative minds.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Upvote the ideas you love and help the best concepts rise to the top organically.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Watch Ideas Grow</h3>
              <p className="text-muted-foreground">
                See your ideas gain momentum in real-time as the community engages and supports them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Share Your Vision?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of innovators bringing their ideas to life.
            </p>
            <Link to="/app">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Launch The Idea Board
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
