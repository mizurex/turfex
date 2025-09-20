import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownWriter = ({ text = ''}) => {
  const markdownText = typeof text === 'string' ? text : String(text ?? '');

  return (
    <div className="text-[14px] sm:text-[15px] leading-6 text-black break-words [overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => (
            <p className="mb-2" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-4 sm:ml-6 mb-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-4 sm:ml-6 mb-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-xl sm:text-2xl font-bold mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg sm:text-xl font-semibold mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base sm:text-lg font-semibold mb-2" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 underline break-words" target="_blank" rel="noopener noreferrer nofollow" {...props} />
          ),
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="bg-neutral-100 rounded px-1 py-0.5 text-[12px] sm:text-[13px]" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-neutral-100 rounded-lg p-3 overflow-x-auto max-w-full">
                <code className="font-mono text-[12px] sm:text-[13px] leading-5 whitespace-pre" {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-3 text-gray-700 my-2" {...props} />
          ),
          hr: () => <hr className="my-3 border-gray-200" />,
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded" loading="lazy" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border-b border-gray-200 px-2 py-1 font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-gray-100 px-2 py-1 align-top" {...props} />
          ),
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  )
};

export default MarkdownWriter;
