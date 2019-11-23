define({ "api": [
  {
    "type": "get",
    "url": "quotes/:id",
    "title": "Get a single quotes by its ID",
    "version": "1.0.0",
    "name": "GetQuote",
    "group": "Quote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The quote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>The quote text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: \"1234\",\n    quote: \"There is much left to say\",\n    author: \"Audacious Coiner\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 422": [
          {
            "group": "Error 422",
            "optional": false,
            "field": "QuoteNotFound",
            "description": "<p>The quote ID was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Not Found\n{\n    code: \"422\",\n    error: \"The quote ID was not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes.js",
    "groupTitle": "Quote"
  },
  {
    "type": "get",
    "url": "quotes",
    "title": "Get a list of quotes",
    "version": "1.0.0",
    "name": "GetQuotes",
    "group": "Quote",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "quotes",
            "description": "<p>A list of quotes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"quotes\": [\n        \"Quote 1\",\n        \"Quote 2\",\n        \"Quote 3\",\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes.js",
    "groupTitle": "Quote"
  },
  {
    "type": "get",
    "url": "quotes/random",
    "title": "Get a random quote",
    "version": "1.0.0",
    "name": "GetRandomQuote",
    "group": "Quote",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quote",
            "description": "<p>The random quote object</p>"
          }
        ]
      }
    },
    "filename": "src/routes.js",
    "groupTitle": "Quote"
  },
  {
    "type": "post",
    "url": "quotes/",
    "title": "Create a new quote",
    "version": "1.0.0",
    "name": "PostQuote",
    "group": "Quote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>The quote text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>The quote author</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quote",
            "description": "<p>The newly created quote object</p>"
          }
        ]
      }
    },
    "filename": "src/routes.js",
    "groupTitle": "Quote"
  },
  {
    "type": "put",
    "url": "quotes/",
    "title": "Update an existing quote",
    "version": "1.0.0",
    "name": "PutQuote",
    "group": "Quote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The quote ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>The quote text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>The quote author</p>"
          }
        ]
      }
    },
    "filename": "src/routes.js",
    "groupTitle": "Quote"
  }
] });
