Fake Contentful
========================

Fakes the Contentful Management API.
For full reference of API see https://www.contentful.com/developers/docs/references/content-management-api/

## API Example ##

POST /spaces/yadj1kx9rmg0/entries

```json
{
  "fields": {
    "title": {
      "en-US": "Hello, World!"
    },
    "body": {
      "en-US": "Bacon is healthy!"
    }
  }
}
```

### Supported API endpoints ###

- DELETE /spaces/:spaceid/entries/:entryid/archived
- UPDATE /spaces/:spaceid/entries/:entryid/archived
- DELETE /spaces/:spaceid/entries/:entryid/published
- PUT /spaces/:spaceid/entries/:entryid/published
- GET /spaces/:spaceid
- GET /spaces/:spaceid/entries/
  - Supports filters: in, nin, limit, skip
- GET /spaces/:spaceid/entries/:entryid
- DELETE /spaces/:spaceid/entries/:entryid

## Use in docker-compose

Load the fake-contentful image and link it into your container where you can override the api.contentful.com url to point to fake container.

```yml
version: "2"
services:
  node:
    build: .
    links:
      - fakeContentful:api.contentful.com
    depends_on:
      - fakeContentful

  fakeContentful:
    image: jahmie/fake-contentful
```

Make sure to also allow insecure connection to force Contentful SDK to use port 80.

```javascript
const contentfulManagement = require('contentful-management');
const contentfulClient = contentfulManagement.createClient({
  insecure: true,
  accessToken: 'YOUR_ACCESS_TOKEN'
});
```

If you do notw ant to ovverride the api.contentful.com url, then you can also use the host option when creating client.

```javascript
const contentfulManagement = require('contentful-management');
const contentfulClient = contentfulManagement.createClient({
  insecure: true,
  host: 'fakeContentful'
  accessToken: 'YOUR_ACCESS_TOKEN'
});
```

## Docker compose override ##


To enable overrides, copy the file docker-compose.override-example.yml into docker-compose.override.yml, it is gitignored.


## Start with ##

```shell
docker-compose up
```


## Run tests ##

```shell
npm test
```
