import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { blogger_v3, google } from "googleapis";
import { marked } from "marked";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BLOG_ID } from '$env/static/private';

export const load = (async () => {
	return {};
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

		const contentToHtml = marked.parse(content);

		const refreshToken = cookies.get('refresh_token');

		if (refreshToken) {
			const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
			oauth2client.setCredentials({ refresh_token: refreshToken });

			const blogger = google.blogger({
				version: 'v3',
				auth: oauth2client
			});

			await blogger.posts.insert({
				blogId: BLOG_ID, postId: params.id, requestBody: {
					title,
					content: contentToHtml,
				}
			});
		}

		redirect(302, '/');
	}
} satisfies Actions;