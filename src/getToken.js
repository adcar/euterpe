import Cookie from 'js-cookie'

const getToken = token => {
	let cookie = Cookie.get(token)
	if (cookie) {
		return cookie
	} else {
		window.location =
			'https://accounts.spotify.com:443/authorize?client_id=88ed4852708440e6908246065f5a7ca4&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-library-modify%20user-library-read%20user-top-read'
	}
}

export default getToken
