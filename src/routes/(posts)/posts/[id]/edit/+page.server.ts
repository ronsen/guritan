import type { PageServerLoad } from './$types';
import { google } from "googleapis";
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BLOG_ID } from '$env/static/private';

export const load = (async ({ params, cookies }) => {
	const refreshToken = cookies.get('refresh_token');

	let post: Post | null = null;

	if (refreshToken) {
		const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
		oauth2client.setCredentials({ refresh_token: refreshToken });

		const blogger = google.blogger({
			version: 'v3',
			auth: oauth2client
		});

		const response = await blogger.posts.get({ blogId: BLOG_ID, postId: params.id });

		if (response.status == 200) {
			const nhm = new NodeHtmlMarkdown();

			post = {
				kind: response.data.kind as string,
				id: response.data.id as string,
				published: response.data.published as string,
				updated: response.data.updated as string,
				url: response.data.url as string,
				title: response.data.title as string,
				content: nhm.translate(response.data.content as string),
			}
		}
	}

	return { post };
}) satisfies PageServerLoad;