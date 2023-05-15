import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';

const spec = path.join(__dirname, '../openapi.yaml');

export default OpenApiValidator.middleware({
  apiSpec: spec,
  validateResponses: false,
});