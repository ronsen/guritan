import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const refreshToken = event.cookies.get('refresh_token');
	const blogId = event.cookies.get('blog_id');
	
	const path = event.url.pathname;

	if (path.startsWith('/posts') || path.startsWith('/pages')) {
		if (!refreshToken) redirect(303, '/');
		if (!blogId) redirect(303, '/');
	}

	if (refreshToken) {
		event.locals.auth = true;
	}

	return await resolve(event);
}