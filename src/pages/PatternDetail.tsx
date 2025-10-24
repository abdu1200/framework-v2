import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Lightbulb } from "lucide-react";
import { MDXContent } from "@/components/MDXContent";
import { FeedbackModal } from "@/components/FeedbackModal";
import { getPattern, Pattern } from "@/lib/mdx";
import Spinner from "@/components/ui/spinner";

export default function PatternDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const [isPatternSolutionLoading, setIsPatternSolutionLoading] = useState(false)
  
  const handleNavigatePatternSolution = () => {
    if(isPatternSolutionLoading) return;
    setIsPatternSolutionLoading(true)
    setTimeout(() => {
      setIsPatternSolutionLoading(false)
      navigate(`/pattern/${slug}/solution`)
    }, 2000)
  }


  useEffect(() => {
    async function loadPattern() {
      if (slug) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        setLoading(true);
        const patternData = await getPattern(slug, 'index');
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
          <h1 className="text-2xl font-bold mb-4">Pattern not found</h1>
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
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Problems Catalog
        </Button>

        <div className="animate-fade-in">
          <MDXContent content={pattern.content} />
        </div>

        <div className="flex gap-4 mt-12 pt-8 border-t border-border justify-center">
          <Button
            variant="outline"
            onClick={() => setShowFeedback(true)}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Give Feedback
          </Button>
          
          <Button
            onClick={handleNavigatePatternSolution}
            className="w-40 gap-2"
          >
            {isPatternSolutionLoading ? <Spinner /> :  <> <Lightbulb className="w-4 h-4" /> Pattern Solution </>}
          </Button>
        </div>
      </div>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        patternTitle={pattern.title}
      />
    </div>
  );
}