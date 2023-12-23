import type { PageServerLoad } from './$types';
import Blogger from '$lib';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.posts.get({ blogId, postId: params.id });
	const post = response.data;

	const publishedAt = new Date(Date.parse(post.published as string));

	return {
		post: {
			...post,
			publishedAt: publishedAt.toLocaleDateString() + ' ' + publishedAt.toLocaleTimeString()
		}
	};
}) satisfies PageServerLoad;