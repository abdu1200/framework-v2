import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatternMetadata } from "@/lib/mdx";
import { ExternalLink } from "lucide-react";

interface PatternModalProps {
  pattern: PatternMetadata | null;
  isOpen: boolean;
  onClose: () => void;
  onReadMore: () => void;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  Hard: "bg-red-100 text-red-800 border-red-200"
};

const categoryColors = {
  Behavioral: "bg-blue-100 text-blue-800 border-blue-200",
  Creational: "bg-purple-100 text-purple-800 border-purple-200",
  Structural: "bg-indigo-100 text-indigo-800 border-indigo-200"
};

export function PatternModal({ pattern, isOpen, onClose, onReadMore }: PatternModalProps) {
  if (!pattern) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="text-xl font-bold">{pattern.title}</DialogTitle>
          </div>
          <div className="flex gap-2 mb-4">
            {/* <Badge 
              variant="outline" 
              className={categoryColors[pattern.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}
            >
              {pattern.category}
            </Badge>
            <Badge 
              variant="outline"
              className={difficultyColors[pattern.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"}
            >
              {pattern.difficulty}
            </Badge> */}
          </div>
          <DialogDescription className="text-base leading-relaxed text-justify">
            {pattern.descriptioning}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onReadMore} className="gap-2">
            Read More
            <ExternalLink className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}