Requirements:

- Node version >= 12

Running:

- Create database in ur local `nodejs_db`;
- Set db user, db pass, db_port in `config.js`

Notes:

- Please read express api here: http://expressjs.com/en/api.html
- ORM use sequelize https://sequelize.org/
- Support async local storage https://nodejs.org/api/async_context.html
- DAL(Data Access Layer): untuk abstraksi ke database, sekaligus sbg layering antara bisnis logic sm presentasi (DB)
  layer
- Coordinator: service layer
- Controller: routes
- Test endpoint:
    - Get all customers: localhost:3000/public/v1/customers
    - Get customer: localhost:3000/public/v1/customers/${customerId}