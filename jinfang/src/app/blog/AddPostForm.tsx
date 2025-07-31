"use client";
import { useActionState } from "react";
import { addPostAction } from "./actions";
export default function AddPostForm() {
	const [message, formAction, isPending] = useActionState(addPostAction, null);

	return (
		<div className="mb-8 p-6 border rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">添加新文章</h2>
			<p className="text-red-500 mb-4">{message?.error}</p>
			<form action={formAction} className="space-y-4">
				<div>
					<label htmlFor="title" className="block mb-2">
						标题
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label htmlFor="content" className="block mb-2">
						内容
					</label>
					<textarea
						name="content"
						className="w-full p-2 border rounded"
						rows={4}
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					添加文章
				</button>
			</form>
		</div>
	);
}
