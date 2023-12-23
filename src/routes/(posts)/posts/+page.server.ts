import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import Blogger from '$lib';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	if (!refreshToken) redirect(302, '/login');
	if (!blogId) redirect(302, '/settings');

	const blogger = Blogger.getInstance(refreshToken);
	const response = await blogger.posts.list({ blogId });
	const posts = response.data;

	return { posts };
}) satisfies PageServerLoad;