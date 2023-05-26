const os = require('os')
const {v4: uuidv4} = require('uuid')
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const {expressjwt: jwt} = require("express-jwt");

const {APP_ENV, JWT_SECRET} = require('../config')
const {asyncLocalStorageMiddleware} = require("../store/store");
const Statuses = require('../lib/statuses')
const {NotFoundError} = require("../err/not_found");
const publicRouter = require('./public')

const initRouter = (app) => {
    const allowlist = ['https://yourdomain.com', 'http://localhost:2000']
    const corsOptionsDelegate = function (req, callback) {
        let corsOptions;
        if (allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = {origin: true} // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = {origin: false} // disable CORS for this request
        }
        callback(null, {
            ...corsOptions,
            credentials: true,
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
            expose: ['APP-X-Access-Token', 'APP-X-Session-Token'], // JWT Expose header
        }) // callback expects two parameters: error and options
    }

    app.use(cors(corsOptionsDelegate))

    app.use(helmet())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))
    // parse application/json
    app.use(bodyParser.json())

    app.use(async (req, res, next) => {
        const reqId = `${os.hostname()}-${uuidv4()}`;
        res.setHeader('APP-X-RequestId', reqId);
        app.locals.requestId = reqId
        await next();
    });

    // asyncLocalStorage - request-scoped storage
    app.use(asyncLocalStorageMiddleware)

    // Error handling
    app.use(async (req, res, next) => {
        try {
            await next()
        } catch (err) {
            console.log('ERROR', err)
            res.statusCode = Statuses.default.NOT_FOUND
            if (err instanceof NotFoundError) {
                res.statusCode = Statuses.default.NOT_FOUND;
                res.write({
                    message: err.message
                })
                res.end();
            }
        }
    });

    app.use(
        jwt({secret: JWT_SECRET, algorithms: ["HS256"], requestProperty: 'jwtdata'}).unless({
            path: ['/', '/health', /^\/public/],
        })
    )
    app.use(async (req, res, next) => {
        app.locals.currentUserId = app.locals.jwtdata?.uid;
        await next();
    });

    // Routes
    app.use(publicRouter.default)
}
exports.initRouter = initRouter;
