import { getPosts } from "@/lib/db";
import AddPostForm from "./AddPostForm";
import styles from "./blog.module.css";

export default async function Page() {
	const posts = await getPosts();

	return (
		<main className={styles.blog}>
			<h1 className="text-3xl font-bold mb-8">我的博客</h1>
			<AddPostForm />
			<div className="space-y-6">
				{posts.map((post) => (
					<article key={post.id} className="border p-6 rounded-lg shadow-sm">
						<h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
						<p className="text-gray-500 text-sm mb-4">
							{new Date(post.createdAt).toLocaleString()}
						</p>
						<div className="text-gray-800">{post.content}</div>
					</article>
				))}
			</div>
		</main>
	);
}
