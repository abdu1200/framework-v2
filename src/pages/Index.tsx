import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatternCard } from "@/components/PatternCard";
import { PatternModal } from "@/components/PatternModal";
import { getAllPatterns, PatternMetadata } from "@/lib/mdx";
import { Book, Code, Zap } from "lucide-react";
import SearchProblemContent from "@/components/Search";

const Index = () => {
  const [patterns, setPatterns] = useState<PatternMetadata[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<PatternMetadata | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPatterns() {
      setLoading(true);
      const allPatterns = await getAllPatterns();
      setPatterns(allPatterns);
      setLoading(false);
    }
    loadPatterns();
  }, []);

  const handleCardClick = (pattern: PatternMetadata) => {
    setSelectedPattern(pattern);
    setShowModal(true);
  };

  const handleReadMore = () => {
    if (selectedPattern) {
      navigate(`/pattern/${selectedPattern.slug}`);
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="hero-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-1/2 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
 {/* Hero Section */}
<div className="hero-gradient py-16 border-b border-border">
  <div className="container mx-auto px-4 text-center">
    <div className="animate-fade-in">
      <h1 className="text-5xl font-bold mb-6 text-foreground">
        A Framework For Utilizing GoF Design Patterns 
      </h1>
      <p className="text-xl text-muted-foreground mb-8 mx-auto">
        A practical framework for selecting and applying design patterns, featuring <b>optimized implementations</b> for resource-heavy patterns.
      </p>
      
      {/* Top Features */}
      <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          <span>Detailed Explanations</span>
        </div>
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <span>Real World Project Examples</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span>Optimized Implementations</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-6xl mx-auto">
        {/* Legend Box - Far Left */}
        <div className="bg-background/50 border border-border rounded-lg p-6 flex-1 text-left lg:mr-auto">
          <div className="font-semibold text-foreground mb-4">Legend</div>
          <div className="flex flex-col gap-3 text-base text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-green-400 rounded mt-1 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-foreground">Behavioural design problems</span> - Problems related to how objects interact and communicate with each other.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-yellow-400 rounded mt-1 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-foreground">Structural design problems</span> - Problems related to how objects are composed and organized into larger structures.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-400 rounded mt-1 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-foreground">Creational design problems</span> - Problems related to how objects are created, initialized and managed within a system.
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Patterns - Far Right */}
        <div className="bg-background/50 border border-border rounded-lg p-6 flex-1 text-left lg:ml-auto">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0 mt-1"></div>
            <p className="text-justify text-muted-foreground">
              <span className="font-medium text-foreground">White-Background design problems</span> - indicate those design problems whose pattern solutions include standard design pattern implementations.
            </p>
          </div>
          <div className="flex items-start gap-3 mt-4">
            <div className="w-6 h-6 bg-gray-400 rounded flex-shrink-0 mt-1"></div>
            <p className="text-justify text-muted-foreground">
              <span className="font-medium text-foreground">Gray-Background design problems</span> - indicate those design problems whose pattern solutions include optimized design pattern implementations, developed because the standard versions of these patterns are relatively resource-heavy in terms of CPU or memory usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Patterns Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Design problems and Their Pattern Solutions
        </h2>
        <SearchProblemContent />
        
        {patterns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patterns available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patterns.map((pattern, index) => (
              <div 
                key={pattern.slug} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PatternCard
                  pattern={pattern}
                  onClick={() => handleCardClick(pattern)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <PatternModal
        pattern={selectedPattern}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReadMore={handleReadMore}
      />
    </div>
  );
};

export default Index;
