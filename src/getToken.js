import Cookie from 'js-cookie'
let url
if (process.env.NODE_ENV === 'production') {
	url = 'https://euterpe.acardosi.dev'
} else if (process.env.NODE_ENV === 'development') {
	url = 'http://localhost:3000'
}
let scope = encodeURIComponent(
	'user-library-modify user-library-read user-top-read user-follow-read playlist-modify-public playlist-modify-private'
)
let clientId = 'a4dc5112192b41abb53449f9f7055355'

const getToken = token => {
	let cookie = Cookie.get(token)
	if (cookie) {
		return cookie
	} else {
		window.location = `https://accounts.spotify.com:443/authorize?client_id=${clientId}&response_type=token&redirect_uri=${url}/callback&scope=${scope}`
	}
}

export default getToken
