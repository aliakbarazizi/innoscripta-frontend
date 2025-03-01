import { LinkExternal02, User02 } from "@untitled-ui/icons-react";
import { formatDate } from "date-fns";

import Section from "../../components/containers/Section";
import { Article as ArticleType } from "../../types";

type Props = {
  article: ArticleType;
};

export default function Article({ article }: Props) {
  return (
    <Section>
      <div className="relative -m-6 mb-2 aspect-video select-none lg:aspect-3/2">
        {article.thumbnail ? (
          <img
            className="h-full w-full rounded-t-lg object-cover"
            src={article.thumbnail}
            alt="Placeholder"
          />
        ) : (
          <div className="h-full w-full rounded-t-lg bg-gray-200" />
        )}
        {article.category?.name && (
          <div className="absolute top-0 right-0 rounded-bl-lg bg-gray-800 px-2 py-1 text-white">
            {article.category?.name}
          </div>
        )}
      </div>
      <h2 className="truncate py-1.5 text-xl font-semibold text-gray-900">
        {article.title}
      </h2>
      <p className="line-clamp-4 h-20 text-sm text-gray-600">
        {article.content}
      </p>
      <div className="mt-4 -mb-2 flex items-center">
        {article.author && (
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-2">
              <User02 className="size-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {article.author.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(article.published_at, "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        )}
        <div className="mt-2 ml-auto flex items-center gap-2">
          <div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-900"
            >
              <span>{article.source.name}</span>
              <LinkExternal02 className="size-4 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
