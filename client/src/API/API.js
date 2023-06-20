const APIURL = new URL('http://localhost:3001/api/');

const getEvents = async () => {
	const response = await fetch(new URL('events', APIURL), {
		method: 'GET'
	});
	if (response.ok) {
		const events = await response.json();
		return events;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const storeSubcategories = async (data) => {
	let err = new Error();
	const response = await fetch(new URL('storeSubcategories', APIURL), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okStore = await response.json();
		return okStore;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const modifyLiked = async (id_event, liked) => {
	let err = new Error();
	const response = await fetch(new URL('modifyLiked', APIURL), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id_event: id_event,
			liked: liked
		})
	});
	if (response.ok) {
		const okModify = await response.json();
		return okModify;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const modifyAllLiked = async () => {
	let err = new Error();
	const response = await fetch(new URL('modifyAllLiked', APIURL), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const okModify = await response.json();
		return okModify;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const getUserCategories = async () => {
	const response = await fetch(new URL('getUserCategories', APIURL), {
		method: 'GET'
	});
	if (response.ok) {
		const categories = await response.json();
		return categories;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getUserSubCategories = async () => {
	const response = await fetch(new URL('getUserSubCategories', APIURL), {
		method: 'GET'
	});
	if (response.ok) {
		const result = await response.json();
		return JSON.parse(result.subcategories);
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getCategoriesAndSubcategories = async () => {
	const response = await fetch(new URL('catAndSubcat', APIURL), {
		method: 'GET'
	});
	if (response.ok) {
		const result = await response.json();
		return result;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const API = {
	getEvents,
	getUserCategories,
	getUserSubCategories,
	getCategoriesAndSubcategories,
	storeSubcategories,
	modifyLiked,
	modifyAllLiked
};

export default API;