import Cookie from 'js-cookie'

const getToken = token => {
	let cookie = Cookie.get(token)
	if (cookie) {
		return cookie
	} else {
		Cookie.set(
			'spotifyAccessToken',
			'BQATONHmRr2xlHSpOq8ZvNu9BDuH1K_VkLlscTH7Tpf2xx8t7orEWEKetFE3htcsoRzsz7jm7jDsoOMV2fn_D2tebIaY2LeIbkkCCiFOCqW39albG0a3ncAcGQESs2cCdrCXfsSKWVrPINVhotnhDVM'
		)
		//window.location ='https://accounts.spotify.com:443/authorize?client_id=88ed4852708440e6908246065f5a7ca4&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-library-modify%20user-library-read')
	}
}

export default getToken
