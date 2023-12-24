import type { PageServerLoad } from './$types';
import Blogger from '$lib';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.pages.get({ blogId, pageId: params.id });
	const page = response.data;

	const publishedAt = new Date(Date.parse(page.published as string));

	return {
		page: {
			...page,
			publishedAt: publishedAt.toLocaleDateString() + ' ' + publishedAt.toLocaleTimeString()
		}
	};
}) satisfies PageServerLoad;