enum Environment {
  LOCAL = 'LOCAL',
  PRODUCTION = 'PRODUCTION',
}

let environment = Environment.LOCAL // DEFAULT

const envParam = process.env.REACT_APP_ENVIRONMENT
if (envParam !== undefined) {
  if (Object.keys(Environment).includes(envParam)) {
    environment = envParam as Environment
  }
}

export const apiBaseUrl = (() => {
  console.log('ENV', environment)
  switch (environment) {
    case Environment.LOCAL: {
      return 'http://localhost:5000'
    }
    case Environment.PRODUCTION: {
      return 'https://vessel-cargo.herokuapp.com'
    }
    default:
      throw Error('apiBaseUrl is not setup correctly -> check if environment is setup correctly')
  }
})()
