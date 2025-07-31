import { unstable_cache } from "next/cache";
import { db } from "~/server/db";

const tiaowen = unstable_cache(
  async () => {
    const res = await db.query.article.findMany();
    return res;
  },
  ["article"],
  { tags: ["article"], revalidate: 60 },
);

export default async function Page() {
  const tiaowens = await tiaowen();
  return (
    <div>
      <div>
        {tiaowens.map((item) => (
          <div
            key={item.id}
            dangerouslySetInnerHTML={{ __html: item.text ?? "" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
