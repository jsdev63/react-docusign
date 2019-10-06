const jsonServer = require('json-server')
const dsEnvelope = require('./lib/dsEnvelope')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
server.use(jsonServer.bodyParser);
server.use(middlewares);

const testUser = {
  email: 'feyyaz@test.com',
  password: '1234'
};

const testProfile = {
  email: 'feyyaz@test.com',
  firstName: 'Feyyaz',
  lastName: 'Akkuş'
};

const testToken = 'example-token';

const authUser = (req) => {
  return req.body.email === testUser.email && req.body.password === testUser.password;
}

server.get('/api', (req, res) => {
  console.log('Your server is running correctly');
   res.status(200).json({
    success: 'Your server is running correctly'
  });
});

server.post('/sendEnvelope', async (req, res) => {
  const results = await dsEnvelope.sendEnvelope(req.body)
  console.log(results)
  res.status(200).send(results)
});

server.post('/register', (req, res) => {
  res.status(200).json({
    success: true
  });
});

server.get('/profile', (req, res) => {
  console.log(req.headers);
  res.status(200).json({
    success: true,
    profile: testProfile
  });
});

server.listen(5000, () => {
  console.log('JSON Server is running.. on 5000');
});
