import type {PageServerLoad} from './$types';
import Blogger from '$lib';

export const load = (async ({cookies}) => {
	const refreshToken = cookies.get('refresh_token');
	const blogId = cookies.get('blog_id');

	const blogger = Blogger.getInstance(refreshToken!);
	const response = await blogger.posts.list({blogId});
	const posts = response.data;

	return {posts};
}) satisfies PageServerLoad;
