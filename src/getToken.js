import Cookie from 'js-cookie'

const getToken = token => {
	let cookie = Cookie.get(token)
	if (cookie) {
		return cookie
	} else {
		window.location = '/' // Only temp, will change this
	}
}

export default getToken
