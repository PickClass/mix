import { db } from "~/server/db";

async function getZhongyaoData(id: number) {
  "use cache";
  const res = await db.query.zhongyao.findFirst({
    where: (zhongyao, { eq }) => eq(zhongyao.id, Number(id)),
  });
  if (!res) {
    return null;
  }
  return {
    title: res.title,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    content: JSON.parse(res.content ? res.content : "[]") as string[],
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const data = await getZhongyaoData(Number(id));
  if (!data) {
    return <div>数据不存在</div>;
  }
  return (
    <>
      <h1>{data.title}</h1>
      <ul>
        {data.content.map((content) => (
          <li key={content}>{content}</li>
        ))}
      </ul>
    </>
  );
}
