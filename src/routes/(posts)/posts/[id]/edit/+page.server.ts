import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { blogger_v3, google } from "googleapis";
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { marked } from "marked";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BLOG_ID } from '$env/static/private';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');

	let post: blogger_v3.Schema$Post | null = null;

	if (refreshToken) {
		const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
		oauth2client.setCredentials({ refresh_token: refreshToken });

		const blogger = google.blogger({
			version: 'v3',
			auth: oauth2client
		});

		const response = await blogger.posts.get({ blogId: BLOG_ID, postId: params.id });
		post = response.data;
	}

	const nhm = new NodeHtmlMarkdown();

	return {
		post: {
			...post,
			'contentToMarkdown': post?.content ? nhm.translate(post!.content as string) : ''
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

		if (refreshToken) {
			const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
			oauth2client.setCredentials({ refresh_token: refreshToken });

			const blogger = google.blogger({
				version: 'v3',
				auth: oauth2client
			});

			// const response = await blogger.posts.patch({ blogId: BLOG_ID, postId: params.id });
			// console.log(response);
		}

		redirect(302, '/');
	}
} satisfies Actions;