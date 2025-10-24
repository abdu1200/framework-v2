// components/CodeBlock.tsx
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  // Detect language from className if provided (like language-java)
  const languageFromClass = className?.match(/language-(\w+)/)?.[1];
  const codeLanguage = (language || languageFromClass || "typescript") as
    | "typescript"
    | "javascript"
    | "java"
    | "csharp"
    | "c#"
    | "text";

  const lines = children.split("\n");
  const shouldShowExpander = lines.length > 10;
  const displayContent =
    shouldShowExpander && !isExpanded
      ? lines.slice(0, 20).join("\n") + "\n..."
      : children;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="code-block-expandable my-4 rounded-lg border">
      <div className="flex items-center justify-between bg-muted px-4 py-2 border-b">
        <span className="text-sm font-mono text-muted-foreground">{codeLanguage}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2">
            <Copy className="w-3 h-3" />
          </Button>
          {shouldShowExpander && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 px-2 gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  <span className="text-xs">Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  <span className="text-xs">Expand</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <SyntaxHighlighter language={codeLanguage} style={oneDark} showLineNumbers>
        {displayContent}
      </SyntaxHighlighter>
    </div>
  );
}
