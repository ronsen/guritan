import type { PageServerLoad } from './$types';
import { blogger_v3, google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BLOG_ID } from '$env/static/private';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');

	let posts: blogger_v3.Schema$PostList | null = null;

	if (refreshToken) {
		const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
		oauth2client.setCredentials({ refresh_token: refreshToken });

		const blogger = google.blogger({
			version: 'v3',
			auth: oauth2client
		});

		const response = await blogger.posts.list({ blogId: BLOG_ID });
		posts = response.data;
	}

	return { posts };
}) satisfies PageServerLoad;