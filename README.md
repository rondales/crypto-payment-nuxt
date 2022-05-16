# web3-front
Follow the steps below for setup.  
Please use Node.js version 12.x series and NPM version 8.5.5.

## Project setup
```
npm install
```

### Start the development server
To start the development server, please create `.env.local` directly under the project root directory in advance.  
To start the built-in server in local environment mode, please create `.env.local` directly under the project root directory in advance.
```
npm run serve
```

### Build for staging
The following commands can be used to build for staging environments.  
If you want to build for a staging environment, please create `.env.staging` directly under the project root directory beforehand.
```
npm run build:stg
```

### Build for production
The following commands can be used to build for production environments.  
If you want to build for a staging environment, please create `.env.production` directly under the project root directory beforehand.
```
npm run build:prd
```

### About .env files
Create a `.env` file for each environment by referring to the `.env.sample` that exists directly under the project root directory.  
Here are some references.

#### .env.local
```
# Environment Setting
NODE_ENV=development

# API Settings
VUE_APP_API_BASE_URL=http://localhost:8082

# Flag Settings
VUE_APP_CONTRACT_UPDATE=false
```
#### .env.staging
```
# Environment Setting
NODE_ENV=development

# API Settings
VUE_APP_API_BASE_URL=https://stg.slash.fi

# Flag Settings
VUE_APP_CONTRACT_UPDATE=false
```

#### .env.production
```
# Environment Setting
NODE_ENV=production

# API Settings
VUE_APP_API_BASE_URL=https://slash.fi

# Flag Settings
VUE_APP_CONTRACT_UPDATE=false
```
