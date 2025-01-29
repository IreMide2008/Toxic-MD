const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZhWTR1RjFGYjlvSW55TC9ydDhjZDNORzQxYTRMZWNoUjJPTlZqSU5YMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczV6NFExbmQ3OVUvdE03UVI3Q2FSVzAxTjVCVWlRcXdaT21WcWs0dGsyOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TDRFQklkSFkvV05PZW5URVhnR1JldU9VbEl2ZGNZRjV0RVdneHkxMTNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0K1VGT0NTQTBTZFZCY0JxUEZpcG9POG04WFRFSGZtc2RpRWYyTTBxZTJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRCM25Qd01vTVdFMmRZV21aZDVUVXBHWDc2aFVFZVhKMnh0aWxHc0sxSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRoaTRJbEhkc0FrSHhjZWU1UE5LSVBzQTZxZll1dmgxYzlmT0dZRXVGa289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RLeEVUTGdyTjVUOVo4eDlOTVo3aGxYNlcyMmhRbmhqaEs2TnNBcWRWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGxpckhEdThTUk1JQTNXTUZzY3NkSTIzY1lnVEhSdHNHVFZmcGswY2hVZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBtL21XaXRWMlVLdlNxVTFGREdiSm5QSVVLZWJSZDZycWlhRysrd1dsd1AyR0NKb0RkRXNtUEdYczVUSm1zVVFYYk9xL3B5MTBuNDNINDFkanVwVUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJLZ2RML2h4eHVWb0FLWUJFazRrSldQdlRJNEhPVU5rVUhINlVXWUovMkc4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQU1NTeUhIaFRZYXhycXJiVEtSeHBnIiwicGhvbmVJZCI6ImE4NzQ3OTZmLThmNjAtNDhlZi1hNWE5LTdmOGI1Mzg4NGY5ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5TDZuVlVBdlEwckVTMHJEZDZUaFl5K2g3T3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmgrSStad05CWXlDSHFnM2hYeWxQdXlRMWpZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRIWVBQNU01IiwibWUiOnsiaWQiOiIyMzQ5MDI0ODgyNDQ1OjE3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlJ1dGhsZXNzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWHRvOHNERVBDaTZMd0dHQkFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJhbjlrOWJLQm5UYUNtUDgvV04wN29JYy92TzRIc0pHYS9lT0FMeGtTVHdrPSIsImFjY291bnRTaWduYXR1cmUiOiJXZThjUkttRGlvY1dTOW5Ta1lCWGJkMXU4L1JKVFpLRk1KZHltb1FUeTJ6WDZmUEUyckVmcUZ5UXM0bENJbnBBM3E0ZlJ4dTl0NTBSMTh5NjNod1FBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNXcyUFowWlhPLzlUS2lvY1NRVXpPYnRTWW1UTG1TVVB6OHFuZ1pldWVYZXk3ZnNZcGhIbW9vcnN5VGdFMURmam04cnd4M3M1MWhqTHJIVW1CWUxtQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI0ODgyNDQ1OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldwL1pQV3lnWjAyZ3BqL1AxamRPNkNIUDd6dUI3Q1JtdjNqZ0M4WkVrOEoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzgxNTAyNjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTlFrIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ruthless",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349024882445",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/jkJGQRZ/5103aef05fd0d76b.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
