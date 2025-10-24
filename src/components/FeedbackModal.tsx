import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  patternTitle: string;
}

export function FeedbackModal({ isOpen, onClose, patternTitle }: FeedbackModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] animate-scale-in p-0 overflow-hidden">
        <DialogHeader className="p-4">
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the <strong> "{patternTitle}" </strong> Description 
             
          </DialogDescription>
        </DialogHeader>

        {/* Embed the form in an iframe */}
        <iframe
          src={`http://localhost:8080/form/a7c689bf-b0a2-42f1-a2b1-5e5071246ebc?05865319-096a-47b9-988c-e95f1bcf925e=${patternTitle}`}
          title="Feedback Form"
          className="w-full h-[80vh] border-none"
        />
      </DialogContent>
    </Dialog>
  );
}
