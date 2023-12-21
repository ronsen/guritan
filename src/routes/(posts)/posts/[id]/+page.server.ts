import type { PageServerLoad } from './$types';
import { blogger_v3, google } from "googleapis";
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

	return { post };
}) satisfies PageServerLoad;