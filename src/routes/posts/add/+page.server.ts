import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { marked } from "marked";
import Blogger from '$lib';

export const actions = {
	default: async ({ request, cookies }) => {
		const { title, content, labels } = Object.fromEntries(await request.formData()) as Record<string, string>;

		if (title.length == 0) {
			return fail(400, {
				error: true,
				message: 'Field <strong>Title</strong> cannot be blank.'
			});
		}

		if (content.length == 0) {
			return fail(400, {
				error: true,
				message: 'Field <strong>Content</strong> cannot be blank.'
			});
		}

		try {
			const refreshToken = cookies.get('refresh_token');
			const blogId = cookies.get('blog_id');
			const blogger = Blogger.getInstance(refreshToken!);

			await blogger.posts.insert({
				blogId,
				requestBody: {
					title,
					content: await marked.parse(content),
					labels: labels.length > 0 ? labels.split(',') : []
				}
			});
		} catch (e: unknown) {
			let message = '';

			if (typeof e === 'string') {
				message = e;
			} else if (e instanceof Error) {
				message = e.message;
			}

			return fail(400, { error: true, message });
		}

		redirect(302, '/posts');
	}
} satisfies Actions;