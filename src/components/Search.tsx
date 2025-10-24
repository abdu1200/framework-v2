import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { getAllPatternContents, Pattern } from "@/lib/mdx";
import { SearchIcon } from "lucide-react";

export default function SearchProblemContent() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [filtered, setFiltered] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllPatternContents();
      setPatterns(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]); 
      return;
    }

    const fuse = new Fuse(patterns, {
      keys: ["title", "content"],
      threshold: 0.5,
    });

    const results = fuse.search(query);
    setFiltered(results.map((r) => r.item));
  }, [query, patterns]);

  return (
    <div className="space-b-4 mb-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
            <SearchIcon />
  <Input
        placeholder="Search a Design Problem..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
        </div>

      <div className="grid">
        {loading && (
          <p className="text-center text-gray-400 mt-3">Loading patterns...</p>
        )}

        {!loading && query.trim() && filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-3">
            No matching problems found.
          </p>
        )}

        {!loading &&
          filtered.map((pattern) => (
            <div
              key={pattern.slug}
              className="flex items-center py-3 px-3 border-b-2 bg-white/400 text-muted-foreground/100 hover:text-zinc-800 cursor-pointer"
              onClick={() => navigate(`/pattern/${pattern.slug}`)}
            >
              <div>
                <p className="text-sm">
                  {pattern.description || "No short description"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
