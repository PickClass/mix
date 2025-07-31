import { db } from "~/server/db";
import { unstable_cache } from "next/cache";

const fetchFormula = unstable_cache(
  async (name: string) => {
    const formula = await db.query.formula.findFirst({
      where: (formula, { eq }) => eq(formula.name, decodeURIComponent(name)),
    });

    if (!formula) return undefined;
    return {
      ...formula,
      list: JSON.parse(formula?.list ?? "[]") as string[],
    };
  },
  ["formula"],
  { tags: ["formula"], revalidate: 60 },
);
export default async function Formula({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const formula = await fetchFormula(name);

  if (!formula) {
    return (
      <div>
        <h1>未找到方剂</h1>
      </div>
    );
  }

  return (
    <div>
      {formula ? <h1>{formula.name}</h1> : <h1>未找到方剂</h1>}
      <div>
        {formula?.list.map((item, index) => (
          <span key={item}>
            {index > 0 && "、"}
            {item}
          </span>
        ))}
      </div>
      {formula?.zhu && (
        <div>
          注解:
          {formula?.zhu && formula?.zhu}
        </div>
      )}
      {formula?.fa && (
        <div>
          法门:
          {formula?.fa}
        </div>
      )}
    </div>
  );
}
