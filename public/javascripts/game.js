function askUsername () {
  var username, regUsername

  regUsername = /^[a-z]+$/i

  username = window.prompt('Please enter your username', '')

  if (!username) {
    window.history.go(-1)
    return
  }

  while (username === null || username.length < 3 || !regUsername.test(username)) {
    username = window.prompt('Only letters and no whitespaces allowed, please try again', '')

    if (!username) {
      window.history.go(-1)
      return
    }
  }

  document.getElementById('username1').textContent = username
}
