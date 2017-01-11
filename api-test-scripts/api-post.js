var request = require('request');

request.post(
    'http://localhost:5003/api/sets/5876a3b20cadb146f7d57112/edit',
    { form: { description: "steve", name: "jobs" } }, function(err, res, body) {
      console.log(body);
    }

)
