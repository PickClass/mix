import { unstable_cache } from "next/cache";
import { db } from "~/server/db";
import { notFound } from "next/navigation";
import Link from "next/link";

// 缓存伤寒论条文数据
const getTreatiseData = unstable_cache(
  async () => {
    const articleEntries = await db.query.article.findMany({});
    return articleEntries.map((entry) => ({
      ...entry,
      // 将fang字段从JSON字符串转换为数组
      fang: JSON.parse(entry?.fang ?? "[]") as string[],
    }));
  },
  ["shanghanlun_treatises"],
  { revalidate: 3600, tags: ["treatises"] },
);

export const revalidate = 3600;

export default async function ArticlePage() {
  const treatiseEntries = await getTreatiseData();
  if (!treatiseEntries.length) notFound();
  return (
    <main className="min-h-screen">
      <h1 className="mb-8 text-center text-3xl font-bold">伤寒论条文</h1>
      <div className="prose mx-auto max-w-3xl space-y-12">
        {treatiseEntries.map((entry, index) => (
          <article key={entry.id} className="border-b pb-8 last:border-0">
            <h2 className="mb-4 text-2xl font-semibold">第{index + 1}条</h2>
            <div className="prose prose-lg">
              <p
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: entry.text ?? "" }}
              />
              <p className="mt-4 text-indigo-700">
                {entry.fang.length > 0 && "推荐方剂："}
                {entry.fang.map((fang: string, index: number) => (
                  <span key={`${entry.id}-${index}`}>
                    {index > 0 && "、"}
                    <Link href={`/formula/${encodeURIComponent(fang)}`}>
                      {fang}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
