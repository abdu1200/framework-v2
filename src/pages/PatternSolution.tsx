import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Code2 } from "lucide-react";
import { MDXContent } from "@/components/MDXContent";
import { FeedbackModal } from "@/components/FeedbackModal";
import { ImplementationModal } from "@/components/ImplementationModal";
import { getPattern, Pattern } from "@/lib/mdx";
import Spinner from "@/components/ui/spinner";

export default function PatternSolution() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showImplementation, setShowImplementation] = useState(false);

  const [isPatternImplementationLoading, setIsPatternImplementationLoading] = useState(false)
  
  const handleNavigatePatternImplementation = () => {
    if(isPatternImplementationLoading) return;
    setIsPatternImplementationLoading(true)
    setTimeout(() => {
      setIsPatternImplementationLoading(false)
      navigate(`/pattern/${slug}/solution/standard`)
    }, 2000)
  }

  // Patterns that have both standard and optimized implementations
  // const multiImplementationPatterns = ['command', 'composite', 'memento', 'chain', 'visitor'];
  // const hasMultipleImplementations = slug ? multiImplementationPatterns.includes(slug.toLowerCase()) : false;

  useEffect(() => {
    async function loadPattern() {
      if (slug) {
        setLoading(true);
        const patternData = await getPattern(slug, 'solution');
        setPattern(patternData);
        setLoading(false);
      }
    }
    loadPattern();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Solution not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problems Catalog 
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problems Catalog
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(`/pattern/${slug}`)}
            className="hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problem Description
          </Button>
        </div>

        <div className="animate-fade-in">
          <MDXContent content={pattern.content} />
        </div>

        <div className="flex justify-center gap-4 mt-12 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setShowFeedback(true)}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Give Feedback
          </Button>
          <Button
            onClick={handleNavigatePatternImplementation}
            className="gap-2"
          >
            {isPatternImplementationLoading ? <Spinner /> :  <> <Code2 className="w-4 h-4" />Pattern Implementation </>}
          </Button>          
        </div>
      </div>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        patternTitle={pattern.title}
      />

      <ImplementationModal
        isOpen={showImplementation}
        onClose={() => setShowImplementation(false)}
        onSelectStandard={() => {
          setShowImplementation(false);
          navigate(`/pattern/${slug}/solution/standard`);
        }}
        onSelectOptimized={() => {
          setShowImplementation(false);
          navigate(`/pattern/${slug}/solution/optimized`);
        }}
      />
    </div>
  );
}