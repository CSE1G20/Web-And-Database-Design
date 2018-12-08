function askUsername () {
  var username, regUsername, regWhiteSpace

  regUsername = /^[a-z]+$/i
  // regWhiteSpace = /^\s+$/

  username = prompt('Please enter your username', '')

  if (!username) {
    window.history.go(-1)
    return
  }

  while (username === null || username.length < 3 || !regUsername.test(username) /* || regWhiteSpace.test(username) */) {
    username = prompt('Only letters and no whitespaces allowed, please try again', '')

    if (!username) {
      window.history.go(-1)
      return
    }
  }

  document.getElementById('username1').textContent = username
}
