import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import rehypeRaw from 'rehype-raw';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  const processedContent = content.replace(/class="/g, 'className="');

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && children) {
              return (
                <CodeBlock
                  language={language}
                  className={className}
                >
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              );
            }
            
            return (
              <code className={`${className} bg-muted px-1.5 py-0.5 rounded-md text-sm`} {...props}>
                {children}
              </code>
            );
          },
          h1({ children }) {
            return <h1 className="text-4xl font-bold mb-6 text-foreground">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>;
          },
          p({ children }) {
            return <p className="mb-4 leading-7 text-foreground">{children}</p>;
          },
          ul({ children }) {
            return <ul className="mb-4 ml-6 list-disc text-foreground">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="mb-4 ml-6 list-decimal text-foreground">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-1 text-foreground">{children}</li>;
          },
          span: ({ className, children }) => {
            return <span className={`inline-block font-normal italic bg-gray-200`}>{children}</span>; //content for classes
          },
          div: ({ className, children }) => {
            return <div className={`font-bold text-blue-900`}>{children}</div>; //subtitle
          },
          text: ({ className, children }) => {
            return <text className={`font-medium text-zinc-700`}>{children}</text>; //title
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}