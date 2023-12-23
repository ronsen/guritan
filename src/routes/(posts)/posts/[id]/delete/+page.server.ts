import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import Blogger from '$lib';

export const actions = {
	default: async ({ cookies, params }) => {
		const refreshToken = cookies.get('refresh_token');
		const blogId = cookies.get('blog_id');
		const blogger = Blogger.getInstance(refreshToken!);

		await blogger.posts.delete({ blogId, postId: params.id, useTrash: true });

		redirect(302, '/posts');
	}
} satisfies Actions;