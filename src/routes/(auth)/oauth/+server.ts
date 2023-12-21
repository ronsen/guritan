import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';

export const GET = (async () => {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/blogger',
			'https://www.googleapis.com/auth/blogger.readonly',
            'openid'
        ],
        prompt: 'consent'
    });

    redirect(302, authorizeUrl);
}) satisfies RequestHandler;