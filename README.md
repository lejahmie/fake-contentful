Fake Contentful
========================

Fakes the Contentful Management API.
For full reference of API see https://www.contentful.com/developers/docs/references/content-management-api/

**API Example:**   

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

Docker compose override
-----------------------

To enable overrides, copy the file docker-compose.override-example.yml into docker-compose.override.yml, it is gitignored.


Start with
----------

```shell
docker-compose up
```


Run tests
---------

```shell
npm test
```
