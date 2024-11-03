import {redirect} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {OAuth2Client} from 'google-auth-library';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '$env/static/private';

export const GET = (async ({url, cookies}) => {
	const code = url.searchParams.get('code') as string;

	try {
		const oAuth2Client = new OAuth2Client(
			CLIENT_ID,
			CLIENT_SECRET,
			REDIRECT_URI
		);
		const r = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(r.tokens);

		const user = oAuth2Client.credentials;

		cookies.set('access_token', String(user.access_token), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
		});

		cookies.set('refresh_token', String(user.refresh_token), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
		});
	} catch (err) {
		console.error(err);
	}

	redirect(303, '/');
}) satisfies RequestHandler;
