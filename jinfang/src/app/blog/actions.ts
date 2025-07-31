"use server";
import { revalidatePath } from "next/cache";
import { addPost } from "@/lib/db";

export async function addPostAction(prevState: any, queryData: FormData) {
	const title = queryData.get("title") as string;
	const content = queryData.get("content") as string;
	console.log("啊", prevState);

	if (!title || !content) {
		return { success: false, error: "标题和内容不能为空" };
	}

	try {
		await addPost(title, content);
		revalidatePath("/blog");
		return { success: true, error: "添加文章  成功" };
	} catch (error) {
		console.error("添加文章失败:", error);
		return { success: false, error: "添加文章失败，请重试" };
	}
}
