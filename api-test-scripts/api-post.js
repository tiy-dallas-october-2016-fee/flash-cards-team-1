var request = require('request');

request.post(
    'http://localhost:5003/api/sets/5876a3b20cadb146f7d57112/quizzer',
    { form: { userId: '5873afebb191a918c65fa69e', correct: 5, incorrect: 3, skipped: 2 } }, function(err, res, body) {
      console.log(body);
    }

)
