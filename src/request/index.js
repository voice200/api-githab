export const test = async () => {
  // const url = 'https://github.com/voice200/oauth/authoriz&client_id=1d02f6c42864d22ded0d&redirect_uri=https://github.com/voice200/oauth/authoriz&client_id=1d02f6c42864d22ded0d'
  // location.href = 'https://github.com/voice200/oauth/authoriz&client_id=1d02f6c42864d22ded0d'
  const url = 'https://github.com/login/oauth/authoriz'
  try {
    const response = await fetch(url, {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    return response.json()
  } catch (e) {
    console.error('e', e)
  }
}
