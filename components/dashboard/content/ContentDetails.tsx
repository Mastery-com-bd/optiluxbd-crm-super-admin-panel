import { TContent } from "@/types/content";

interface ContentDetailsProps {
  content: TContent;
}

export default function ContentDetails({ content }: ContentDetailsProps) {
  if (!content) return <p className="text-center py-10">No content found!</p>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="effect mx-auto p-6  my-6 shadow-md rounded-lg border">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {content.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${content.isActive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
          >
            {content.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
          <p>Key: <span className="font-mono text-slate-700 dark:text-slate-300">{content.key}</span></p>
          <div className="flex gap-4">
            <p>Created: {formatDate(content.createdAt)}</p>
            <p>Updated: {formatDate(content.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="prose prose-slate dark:prose-invert max-w-none break-words">
        <div
          dangerouslySetInnerHTML={{
            __html: content.content || "<p>No detailed content available.</p>",
          }}
        />
      </div>
    </div>
  );
}