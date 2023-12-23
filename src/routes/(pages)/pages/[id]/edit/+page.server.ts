import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { marked } from "marked";
import Blogger from '$lib';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.pages.get({ blogId, pageId: params.id });
	const page = response.data;

	const nhm = new NodeHtmlMarkdown();

	return {
		page: {
			...page,
			'contentToMarkdown': page?.content ? nhm.translate(page!.content as string) : ''
		}
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies, params }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as Record<string, string>;

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

		await blogger.pages.patch({
			blogId, pageId: params.id, requestBody: {
				id: params.id,
				title,
				content: marked.parse(content),
			}
		});

		redirect(302, '/pages');
	}
} satisfies Actions;