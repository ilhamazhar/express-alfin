exports.APP_HOST = process.env.APP_HOST || '127.0.0.1'
exports.APP_PORT = process.env.APP_PORT || 3000
exports.APP_ENV = process.env.APP_ENV || process.env.NODE_ENV || 'dev'
exports.DB_HOST = process.env.DB_HOST || '127.0.0.1'
exports.DB_USER = process.env.DB_USER || 'postgres'
exports.DB_PASS = process.env.DB_PASS || 'postgres'
exports.DB_DATABASE = process.env.DB_DATABASE || 'nodejs_db'
exports.DB_PORT = process.env.DB_PORT || 5432
exports.JWT_SECRET =
    process.env.JWT_SECRET || 'a-very-secretive-secret-key'