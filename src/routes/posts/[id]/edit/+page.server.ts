import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { marked } from "marked";
import Blogger from '$lib';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.posts.get({ blogId, postId: params.id });
	const post = response.data;

	const nhm = new NodeHtmlMarkdown();

	return {
		post: {
			...post,
			'contentToMarkdown': post?.content ? nhm.translate(post!.content as string) : '',
		}
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies, params }) => {
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

		const refreshToken = cookies.get('refresh_token');
		const blogId = cookies.get('blog_id');
		const blogger = Blogger.getInstance(refreshToken!);

		try {
			await blogger.posts.patch({
				blogId,
				postId: params.id,
				requestBody: {
					id: params.id,
					title,
					content: await marked.parse(content),
					labels: labels.split(',')
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