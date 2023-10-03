import 'dotenv/config';

export default {
    expo: {
        extra: {
            REACT_APP_ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
            REACT_APP_SECRET_ACCESS_KEY: process.env.REACT_APP_SECRET_ACCESS_KEY,
        }
    }
}
