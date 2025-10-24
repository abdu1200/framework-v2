export interface Pattern {
  slug: string;
  title: string;
  description: string;
  descriptioning: string;
  category: string;
  difficulty: string;
  content: string;
}

export interface PatternMetadata {
  slug: string;
  title: string;
  description: string;
  descriptioning: string;
  category: string;
  difficulty: string;
}

// Use Vite's glob import to get all MDX files
const mdxModules = import.meta.glob('/content/**/*.mdx', {
  as: 'raw',
  eager: true
});

// Extract pattern data from file paths
function extractPatternData(): Map<string, any> {
  const patterns = new Map();

  for (const [filePath, content] of Object.entries(mdxModules)) {
    // Parse file path to get pattern slug and type
    const pathParts = filePath.split('/');
    const slug = pathParts[2]; // content/[slug]/file.mdx
    const fileName = pathParts[3].replace('.mdx', '');

    if (!patterns.has(slug)) {
      patterns.set(slug, {
        metadata: {},
        files: new Map()
      });
    }

    const pattern = patterns.get(slug);
    pattern.files.set(fileName, content);

    // If this is the index file, extract metadata
    if (fileName === 'index') {
      const { data } = parseFrontmatter(content);
      pattern.metadata = {
        slug,
        title: data.title || formatSlug(slug),
        description: data.description || 'No description available',
        descriptioning: data.descriptioning || 'No descriptioning available',
        category: data.category || 'Uncategorized',
        difficulty: data.difficulty || 'Medium'
      };
    }
  }

  return patterns;
}

// Simple frontmatter parser (basic implementation)
function parseFrontmatter(content: string): { data: any; content: string } {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterLines: string[] = [];
  let contentLines: string[] = [];

  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        inFrontmatter = false;
        continue;
      }
    }

    if (inFrontmatter) {
      frontmatterLines.push(line);
    } else {
      contentLines.push(line);
    }
  }

  const data: any = {};
  for (const line of frontmatterLines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
    }
  }

  return {
    data,
    content: contentLines.join('\n').trim()
  };
}

function formatSlug(slug: string): string {
  return slug.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

// Cache the parsed patterns
const patternsCache = extractPatternData();

export async function getAllPatterns(): Promise<PatternMetadata[]> {
  console.log('Loading patterns from MDX files...');

  const patterns: PatternMetadata[] = [];

  for (const [slug, patternData] of patternsCache.entries()) {
    if (patternData.metadata) {
      patterns.push(patternData.metadata);
    }
  }

  console.log(`Loaded ${patterns.length} patterns:`, patterns.map(p => p.slug));
  return patterns.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPattern(
    slug: string,
    type: 'index' | 'solution' | 'standard' | 'optimized' = 'index'
): Promise<Pattern | null> {
  console.log(`Getting pattern: ${slug}, type: ${type}`);

  const patternData = patternsCache.get(slug);
  if (!patternData) {
    console.error(`Pattern not found: ${slug}`);
    return null;
  }

  // Determine which file to read based on type
  let fileName = type;
  let titleSuffix = '';

  switch (type) {
    case 'solution':
      titleSuffix = ' - Solution';
      break;
    case 'standard':
      titleSuffix = ' - Implementation Guideline';
      break;
    case 'optimized':
      titleSuffix = ' - Optimized Implementation';
      break;
    default:
      fileName = 'index';
      titleSuffix = '';
  }

  // Get the content, fallback to index if specific file doesn't exist
  let content = patternData.files.get(fileName) || patternData.files.get('index');

  if (!content) {
    console.error(`No content found for pattern: ${slug}, type: ${type}`);
    return null;
  }

  const { data: frontmatter, content: mdxContent } = parseFrontmatter(content);

  return {
    slug,
    title: (frontmatter.title || patternData.metadata?.title || formatSlug(slug)) + titleSuffix,
    description: frontmatter.description || patternData.metadata?.description || 'No description available',
    descriptioning: frontmatter.descriptioning || patternData.metadata?.descriptioning || 'No descriptioning available',
    category: frontmatter.category || patternData.metadata?.category || 'Uncategorized',
    difficulty: frontmatter.difficulty || patternData.metadata?.difficulty || 'Medium',
    content: mdxContent
  };
}

export async function getAllPatternContents(): Promise<Pattern[]> {
  const all: Pattern[] = [];

  for (const [slug, patternData] of patternsCache.entries()) {
    const file = patternData.files.get("index");
    if (!file) continue;

    const { data, content } = parseFrontmatter(file);

    all.push({
      slug,
      title: data.title || formatSlug(slug),
      description: data.description || "",
      descriptioning: data.descriptioning || "",
      category: data.category || "Uncategorized",
      difficulty: data.difficulty || "Medium",
      content,
    });
  }

  return all;
}


export async function patternHasImplementation(slug: string, type: 'standard' | 'optimized'): Promise<boolean> {
  const patternData = patternsCache.get(slug);
  return patternData ? patternData.files.has(type) : false;
}