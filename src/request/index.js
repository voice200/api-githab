import { getRandomString } from "@/utils/utils";

const client_id = '1d02f6c42864d22ded0d'
// const homepage_url = 'https://git-analytics-test-malysheva.web.app/'
const secret_client = '3fa9093a4cfed7722bb6cb31fc7c41e29d1046da'
const homepage_url = 'http://localhost:8080'
const state = getRandomString()


export const getAuth = async () => {
  localStorage.setItem("state", state);

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${homepage_url}&state=${state}`
  // const url = 'https://github.com/login/oauth/authorize'
  location.href = url
  // const headers = new Headers()
  // headers.append('Content-Type', 'text/html; charset=utf-8')
  // headers.append('Access-Control-Allow-Origin', '*')
  // headers.append('Access-Control-Allow-Methods', '*')

  // const requestOptions = {
  //   method: 'GET',
  //   headers: headers,
  // };
  // try {
  //   const response = await fetch(url, requestOptions)
  //   console.log('response.text()', response.text())
  //   return response.text()
  // } catch (e) {
  //   console.error('e', e)
  // }
}

export const getToken = async (code) => {
  const url = `http://localhost:8080/login/oauth/access_token`
  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept','application/json' )
    // headers.append('Access-Control-Allow-Origin', '*')

    const body = {
      client_id,
      client_secret: secret_client,
      code
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    return response.json()
  } catch (e) {
    console.error('e', e)
  }
}
export const getUser = async (token) =>{
 // https://api.github.com/user
  const url = 'http://localhost:8080/api/user'
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept','application/json' )
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    try {
      const response = await fetch(url, requestOptions)
      return response.json()
    } catch (e) {
      console.error('e', e)
    }

}

