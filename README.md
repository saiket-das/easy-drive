## Easy Drive

#### How to run this repository on your machine
###### 1. Clone repository
<pre>git@github.com:saiket-das/easy-drive.git</pre>

###### 2. Navigate to the cloned directory
<pre>cd easy-drive</pre>

#### BACKEND
###### 1. Navigate to the cloned directory
<pre>cd backend</pre>

###### 2. Install npm dependencies
<pre>npm install </pre>

###### 3. Configuration
<p>- Create a .env file in the root directory of the project. Follow .env.example file</p>
<p>- Add necessary configuration variables in the .env file. Example:</p>
<pre>
  NODE_ENV=development
  PORT=9000
  DATABASE_URL=mongodb_url
  BCRYPT_SALT_ROUNDS=12
  JWT_ACCESS_TOKEN_EXPRIRES_IN=10d
  JWT_ACCESS_SECRET=jwt_access_secret
  STRIPE_SECRET_KEY=stripe_secret_key
</pre>

###### 4. Run the project
<pre>npm RUN DEV</pre>



#### FRONTEND
###### 1. Navigate to the cloned directory
<pre>cd frontend</pre>

###### 2. Install npm dependencies
<pre>npm install </pre>

###### 3. Run the project
<pre>npm run dev</pre>
