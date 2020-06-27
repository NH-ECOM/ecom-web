const config = require('../config/config.js');
const LoginDao = require('../dao/LoginDao');

const loginApiConfig = {
  endPoint: config.endpoints.login,
};

const LoginController = {
  async validateSignIn(userName, userPass) {
    const reqBody = {
      userName: `${userName}`,
      userPass: `${userPass}`,
    };

    const OPTIONS = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    };
    let request = new Request('http://localhost:3000/api/login', OPTIONS);

    fetch(request).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });

    let finalResult = await LoginDao.validateSignIn(userName, userPass);
    console.log('finalResult ::  ' + finalResult);

    return finalResult;
  },
};

module.exports = LoginController;
