import { db } from "~/server/db";

export const dynamicParams = false; // or false, to 404 on unknown paths

// 配置ISR: 每60秒重新验证缓存
export const revalidate = 60;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  // 获取所有文章ID用于静态生成
  try {
    const res = await db.query.article.findMany();
    return (res ?? []).map((post) => ({ id: post.id.toString() }));
  } catch (error) {
    console.error("查询文章列表时出错:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  // 获取当前文章数据
  const post = await db.query.article.findFirst({
    where: (article, { eq }) => eq(article.id, Number(resolvedParams.id)),
  });

  return (
    <main>
      <article className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-3xl font-bold">{post?.id}</h1>
        <div className="prose prose-blue max-w-none">{post?.text}</div>
      </article>
    </main>
  );
}
