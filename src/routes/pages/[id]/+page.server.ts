import type {PageServerLoad} from './$types';
import Blogger from '$lib';
import {redirect} from '@sveltejs/kit';

export const load = (async ({params, cookies}) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	try {
		const blogger = Blogger.getInstance(refreshToken!);
		const response = await blogger.pages.get({blogId, pageId: params.id});
		const page = response.data;

		const publishedAt = new Date(Date.parse(page.published as string));

		return {
			page: {
				...page,
				publishedAt:
					publishedAt.toLocaleDateString() +
					' ' +
					publishedAt.toLocaleTimeString(),
			},
		};
	} catch (e: unknown) {
		redirect(302, '/pages');
	}
}) satisfies PageServerLoad;
