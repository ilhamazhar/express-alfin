const {Sequelize,} = require("sequelize");
const {Umzug, SequelizeStorage} = require("umzug");


const {APP_ENV, DB_DATABASE, DB_USER, DB_PASS, DB_HOST} = require('../config');

const db = {
    sequelize: new Sequelize(
        APP_ENV !== 'test' ? DB_DATABASE : 'nodejs_db_test',
        APP_ENV !== 'test' ? DB_USER : 'postgres',
        APP_ENV !== 'test' ? DB_PASS : '',
        {
            host: APP_ENV !== 'test' ? DB_HOST : 'localhost',
            dialect: 'postgres',
            pool: {
                max: 40,
                min: 0,
                acquire: 60000,
                idle: 10000,
            },
            // enable when you want to check the generated SQL by sequelize
            // logging: APP_ENV !== 'production',
            logging: false,
        }
    )
}
exports.db = db;

const initDB = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log(`Unable to connect to the database: ${err}`);
    }
};
exports.initDB = initDB;

const initMigration = async () => {
    try {
        console.log('Starting migration.');
        const umzug = new Umzug({
            migrations: {
                glob: 'migrations/*.js',
                resolve: ({name, path, context}) => {
                    // adjust the migration parameters Umzug will
                    // pass to migration methods, this is done because
                    // Sequelize-CLI generates migrations that require
                    // two parameters be passed to the up and down methods
                    // but by default Umzug will only pass the first
                    const migration = require(path || '');
                    return {
                        name,
                        up: async () => migration.up(context, Sequelize),
                        down: async () => migration.down(context, Sequelize),
                    };
                },
            },
            context: db.sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize: db.sequelize}),
            logger: console,
        });
        // Checks migrations and run them if they are not already applied. To keep
        // track of the executed migrations, a table (and sequelize model) called
        // SequelizeMeta will be automatically created (if it doesn't exist
        // already) and parsed.
        await umzug.up();
        console.log('Migration ran successfully.');
    } catch (err) {
        console.log(`Migration failed: ${err}`);
    }
}

exports.initMigration = initMigration;
