const localizedPath = /^\/(?:en|ru)(?:\/|$)/;

export function remarkBaseLinks(base) {
	const normalizedBase = `/${base.replace(/^\/+|\/+$/g, '')}/`;

	return function transformer(tree) {
		visit(tree);
	};

	function visit(node) {
		if (
			(node.type === 'link' || node.type === 'definition') &&
			typeof node.url === 'string' &&
			localizedPath.test(node.url)
		) {
			node.url = normalizedBase + node.url.slice(1);
		}

		if (Array.isArray(node.children)) {
			for (const child of node.children) visit(child);
		}
	}
}
