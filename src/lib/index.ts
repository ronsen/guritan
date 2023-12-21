// place files you want to import through the `$lib` alias in this folder.

type Blog = {
	kind: string
	id: string
	name: string
	description: string
	url: string
	posts: {
		totalItems: number
	}
	pages: {
		totalItems: number
	}
}

type Post = {
	kind: string
	id: string
	published: string
	updated: string
	url: string
	title: string
	content: string
}