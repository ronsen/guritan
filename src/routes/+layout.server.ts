import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const refreshToken = cookies.get('refresh_token');
	const auth = refreshToken ? true : false;

	return { auth };
}) satisfies LayoutServerLoad;