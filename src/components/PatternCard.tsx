import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatternMetadata } from "@/lib/mdx";
import { useState } from "react";
import Spinner from "./ui/spinner";

interface PatternCardProps {
  pattern: PatternMetadata;
  onClick: () => void;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  Hard: "bg-red-100 text-red-800 border-red-200"
};

const categoryColors = {
  Behavioral: "bg-green-200 text-green-800 border-green-200",
  Structural: "bg-yellow-200 text-yellow-800 border-yellow-200",
  Creational: "bg-red-200 text-red-800 border-red-200"
};

const optimizedPatterns = [
  "Design Problem 1",
  "Design Problem 3",
  "Design Problem 5",
]

export function PatternCard({ pattern, onClick }: PatternCardProps) {
  console.log({pattern})
  
  return (
    <Card 
      className={`pattern-card group animate-fade-in cursor-pointer ${optimizedPatterns.includes(pattern.title) && "bg-gray-200 hover:bg-gray-300"}`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {pattern.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge 
              variant="outline" 
              className={categoryColors[pattern.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}
            >
              {pattern.category}
            </Badge>
            {/* <Badge 
              variant="outline"
              className={difficultyColors[pattern.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"}
            >
               {pattern.difficulty}
            </Badge> */}
          </div>
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {pattern.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Click to learn more →</span>
        </div>
      </CardContent>
    </Card>
  );
}