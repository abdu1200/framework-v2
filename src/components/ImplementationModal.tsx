import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImplementationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStandard: () => void;
  onSelectOptimized: () => void;
}

// const standardTradeoffs = [
//   "Simple and straightforward implementation",
//   "Easy to understand and maintain",
//   "Good for learning purposes",
//   "May have performance limitations",
//   "Basic error handling"
// ];

// const optimizedTradeoffs = [
//   "Enhanced performance and efficiency",
//   "Advanced error handling and logging",
//   "Production-ready features",
//   "More complex implementation",
//   "Additional dependencies may be required"
// ];

export function ImplementationModal({ 
  isOpen, 
  onClose, 
  onSelectStandard, 
  onSelectOptimized 
}: ImplementationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose Implementation</DialogTitle>
          <DialogDescription>
            Select the implementation approach that best fits your needs
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Standard Implementation */}
          <div className="space-y-4">
            {/* <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Standard
              </Badge>
            </div> */}
            
            {/* <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Trade-offs:</h4>
              <ul className="space-y-1">
                {standardTradeoffs.map((tradeoff, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {tradeoff}
                  </li>
                ))}
              </ul>
            </div> */}
            
            <Button 
              variant="outline" 
              onClick={onSelectStandard}
              className="w-full mt-4"
            >
              View Standard
            </Button>
          </div>

          {/* Optimized Implementation */}
          <div className="space-y-4">
            {/* <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Optimized
              </Badge>
            </div> */}
            
            {/* <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Trade-offs:</h4>
              <ul className="space-y-1">
                {optimizedTradeoffs.map((tradeoff, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    {tradeoff}
                  </li>
                ))}
              </ul>
            </div> */}
            
            <Button 
              onClick={onSelectOptimized}
              className="w-full mt-4"
            >
              View Optimized
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}