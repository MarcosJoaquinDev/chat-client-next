import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
console.log(process.env.DEVELOPMENT);
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.NEXT_PUBLIC_FIREBASE_DATA_BASE_URL
}

const app = initializeApp(config);
const rtdb = getDatabase(app);

export{rtdb}