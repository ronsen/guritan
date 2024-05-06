import type { PageServerLoad } from './$types';
import Blogger from '$lib';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.pages.list({ blogId });
	const pages = response.data;

	return { pages };
}) satisfies PageServerLoad;