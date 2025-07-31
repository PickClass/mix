import Link from "next/link";

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div>
			<h1>{slug}</h1>
			<p>{slug}</p>
			<Link href={`/blog/4`}>{44}</Link>
		</div>
	);
}
