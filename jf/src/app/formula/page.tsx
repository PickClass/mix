import { unstable_cache } from "next/cache";
import Link from "next/link";
import { db } from "~/server/db";

export async function generateStaticParams() {
  const formulas = await db.query.formula.findMany();
  return formulas;
}

export default async function Formula() {
  const formulas = await db.query.formula.findMany();

  return (
    <div>
      <h1>方剂列表</h1>
      <ul>
        {formulas.map((formula) => (
          <li key={formula.id}>
            <p>{formula.letter}</p>
            <Link href={`/formula/${encodeURIComponent(formula?.name ?? "")}`}>
              {formula.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
