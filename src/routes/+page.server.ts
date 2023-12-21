import type { PageServerLoad } from './$types';
import { google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BLOG_ID } from '$env/static/private';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');

	let blog: Blog | null = null;
	let posts: Post[] | null = [];

	if (refreshToken) {
		const oauth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
		oauth2client.setCredentials({ refresh_token: refreshToken });

		const blogger = google.blogger({
			version: 'v3',
			auth: oauth2client
		});

		const params = {
			blogId: BLOG_ID
		};

		const blogResponse = await blogger.blogs.get({ blogId: params.blogId });

		if (blogResponse.status == 200) {
			blog = {
				kind: blogResponse.data.kind as string,
				id: blogResponse.data.id as string,
				name: blogResponse.data.name as string,
				description: blogResponse.data.description as string,
				url: blogResponse.data.url as string,
				pages: { totalItems: blogResponse.data.pages?.totalItems as number},
				posts: { totalItems: blogResponse.data.posts?.totalItems as number},
			}
		}

		const postsResponse = await blogger.posts.list({ blogId: params.blogId });

		if (postsResponse.status == 200) {
			postsResponse.data.items?.forEach((item) => {
				const post: Post = {
					kind: item.kind as string,
					id: item.id as string,
					published: item.published as string,
					updated: item.updated as string,
					url: item.url as string,
					title: item.title as string,
					content: item.content as string,
				}

				posts?.push(post);
			});
		}
	}

	return { blog, posts };
}) satisfies PageServerLoad;