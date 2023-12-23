import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.auth) {
		redirect(302, '/posts');
	}
	
    return {};
}) satisfies PageServerLoad;