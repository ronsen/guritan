import type { PageServerLoad } from './$types';
import Blogger from '$lib';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	if (!refreshToken) redirect(302, '/login');
	if (!blogId) redirect(302, '/settings');

	const blogger = Blogger.getInstance(refreshToken);

	const response = await blogger.pages.get({ blogId, pageId: params.id });
	const page = response.data;

	return { page };
}) satisfies PageServerLoad;