import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');

	if (refreshToken) {
		redirect(302, '/posts');
	}
	
    return {};
}) satisfies PageServerLoad;