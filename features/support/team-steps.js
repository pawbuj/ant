const pactum = require('pactum');
const { Before, Given } = require('@cucumber/cucumber');
const { exit } = require('process');

let spec = pactum.spec();

Before(async () => {
  await clearTeams();
});

Given(/^there is a team (.*)$/, async function (name) {
    await createTeam(name);
});

Given('there are {int} teams', async function (count) {
    const penddings = []
    for(i=1;i<=count;i++) {
        penddings.push(createTeam('team' + i));
    }
    await Promise.all(penddings);
});

async function clearTeams() {
  let spec = pactum.spec();
  const resp = await spec.get('/teams').expectStatus(200);
  const penndings = [];
  for(const team of resp.json){
    spec = pactum.spec();
    penndings.push(spec.delete('/teams/{id}').withPathParams('id', team.id).expectStatus(204))
  } 
  await Promise.all(penndings);
}

async function createTeam(name) {
    let spec = pactum.spec();
    await spec
        .post('/teams')
        .withJson({'name': name})
        .expectStatus(201);
}