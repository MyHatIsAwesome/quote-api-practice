const express = require('express');
const router = express.Router();

const {success, failure, asyncRoute} = require('./util');
const records = require('./records');

/**
 * @api {get} quotes Get a list of quotes
 * @apiVersion 1.0.0
 * @apiName GetQuotes
 * @apiGroup Quote
 * 
 * @apiSuccess {String[]} quotes A list of quotes
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "quotes": [
 *              "Quote 1",
 *              "Quote 2",
 *              "Quote 3",
 *          ]
 *      }
 */
router.get('/quotes', asyncRoute(async (req, res) => {
    res.json(await records.getQuotes());
}));

/**
 * @api {get} quotes/random Get a random quote
 * @apiVersion 1.0.0
 * @apiName GetRandomQuote
 * @apiGroup Quote
 * 
 * @apiSuccess {Object} quote The random quote object
 */
router.get('/quotes/random', asyncRoute(async (req, res) => {
    const quote = await records.getRandomQuote();
    res.json(success(quote));
}));

/**
 * @api {get} quotes/:id Get a single quotes by its ID
 * @apiVersion 1.0.0
 * @apiName GetQuote
 * @apiGroup Quote
 * 
 * @apiParam {Number} id The quote ID
 * 
 * @apiSuccess {String} quote The quote text
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: "1234",
 *          quote: "There is much left to say",
 *          author: "Audacious Coiner"
 *      }
 * 
 * @apiError (Error 422) QuoteNotFound The quote ID was not found
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 422 Not Found
 *      {
 *          code: "422",
 *          error: "The quote ID was not found"
 *      }
 */
router.get('/quotes/:id', asyncRoute(async (req, res) => {
    const quote = await getQuoteOrThrow(req);
    res.json(success(quote));
}));

/**
 * @api {post} quotes/ Create a new quote
 * @apiVersion 1.0.0
 * @apiName PostQuote
 * @apiGroup Quote
 * 
 * @apiParam {String} quote The quote text
 * @apiParam {String} author The quote author
 * 
 * @apiSuccess {Object} quote The newly created quote object
 */
router.post('/quotes', asyncRoute(async (req, res) => {
    checkUpdateQuoteParams(req);
    const quote = await records.createQuote({ quote: req.body.quote, author: req.body.author });
    res.status(201).json(success(quote));
}));

/**
 * @api {put} quotes/ Update an existing quote
 * @apiVersion 1.0.0
 * @apiName PutQuote
 * @apiGroup Quote
 * 
 * @apiParam {Number} id The quote ID
 * @apiParam {String} quote The quote text
 * @apiParam {String} author The quote author
 */
router.put('/quotes/:id', asyncRoute(async (req, res) => {
    checkUpdateQuoteParams(req, res);
    const quote = await getQuoteOrThrow(req);

    quote.quote = req.body.quote;
    quote.author = req.body.author;
    
    await records.updateQuote(quote);
    res.status(204).end();
}));

// DELETE a quote
router.delete('/quotes/:id', asyncRoute(async (req, res) => {
    const quote = await getQuoteOrThrow(req);
    await records.deleteQuote(quote);
    res.status(204).end();
}));


function getQuoteOrThrow(req) {
    let p = new Promise(async (resolve, reject) => {
        let quote = await records.getQuote(req.params.id);
        if (quote) {
            resolve(quote);
        } else {
            let err = new Error("The quote ID was not found");
            err.status = 422;
            reject(err)
        }
    });
    
    return p;
}

function checkUpdateQuoteParams(req) {
    if (!req.body.quote || !req.body.author) {
        let err = new Error("Both 'quote' and 'author' parameters are required.");
        err.status = 400;
        throw err;
    }
}

module.exports = router;