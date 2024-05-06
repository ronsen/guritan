import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const blogId = cookies.get('blog_id') ?? '';

	return { blogId };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const { blog } = Object.fromEntries(await request.formData()) as Record<string, string>;

		if (blog.length == 0) {
			return fail(400, {
				error: true,
				message: 'Field <strong>Blog ID</strong> cannot be blank.'
			});
		}

		cookies.set('blog_id', blog, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(302, '/settings');
	}
}