import { db } from "~/server/db";

interface Props {
  params: {
    id: string;
  };
}
async function getZhongyaoData() {
  "use cache";
  const data = await db.query.zhongyao.findMany();
  return data.map((item) => {
    return {
      ...item,
      content: (() => {
        try {
          return JSON.parse(item?.content ?? "[]") as string[];
        } catch (error) {
          return [];
        }
      })(),
    };
  });
}

export default async function Page() {
  const data = await getZhongyaoData();
  const parentData = data.filter(
    (item) => item.h1 === null && item.h2 === null && item.parentId,
  );
  
  return (
    <>
      <h1>中药数据</h1>
      {parentData.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <ul>
            {/* {item.content} */}
            {item.content.map((content) => (
              <li key={content}>{content}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
