const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(() => {
  request.setBaseUrl('http://localhost:5000');
  settings.setReporterAutoRun(false);
});