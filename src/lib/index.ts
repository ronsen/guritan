import { blogger_v3, google } from 'googleapis';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';

class Blogger {
	private static instance: blogger_v3.Blogger | null = null;

	private constructor() {}

	public static getInstance(refreshToken: string): blogger_v3.Blogger {
		if (!Blogger.instance) {
			const oauth2client = new google.auth.OAuth2(
				CLIENT_ID,
				CLIENT_SECRET,
				REDIRECT_URI
			);
			oauth2client.setCredentials({ refresh_token: refreshToken });

			Blogger.instance = google.blogger({
				version: 'v3',
				auth: oauth2client,
			});
		}

		return Blogger.instance;
	}
}

export default Blogger;
