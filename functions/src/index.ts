// https://firebase.google.com/docs/functions/typescript

// Importation de type effacé à La compilation Js
import {CallableContext} from "firebase-functions/lib/common/providers/https";
// import {defineString} from "firebase-functions/lib/params";
const {defineString} = require("firebase-functions/params");
const {onCall, HttpsError} = require('firebase-functions/v1/https');

const axios = require('axios');
const OAuth = require('oauth-1.0a');
const {createHmac} = require('crypto');

// const dotenv = require("dotenv");
// dotenv.config();
// const consumerKey = process.env.CONSUMER_KEY ;
// const consumerSecret = process.env.CONSUMER_SECRET;

const consumerKeySecret = defineString('TWITTER_CONSUMER_KEY');
const consumerSecretSecret = defineString('TWITTER_CONSUMER_SECRET');

function getOAuth() {
    const consumerKey = consumerKeySecret.value();
    const consumerSecret = consumerSecretSecret.value();

    return new OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret,
        },
        signature_method: "HMAC-SHA1",
        hash_function(baseString: string, key: string) {
            return createHmac("sha1", key).update(baseString).digest("base64");
        },
    });
}

interface TwitterProxyData {
    url: string;
    method: "GET" | "POST";
    params: any;
    accessToken: string;
    accessTokenSecret: string;
}

// Fonction Cloud pour servir de proxy Twitter
exports.twitterProxy = onCall(
    async (data: TwitterProxyData, context: CallableContext) => {
        console.log("Début de la fonction twitterProxy");

        // Vérifier l'authentification de l'utilisateur
        if (!context.auth) {
            console.error("Utilisateur non authentifié");
            throw new HttpsError(
                "unauthenticated",
                "L'utilisateur doit être authentifié.",
            );
        }

        const {url, method, params, accessToken, accessTokenSecret} = data;
        console.log("Données reçues :", data);

        const oauth = getOAuth();

        const requestData = {
            url: url,
            method: method,
            data: params,
        };

        const token = {
            key: accessToken,
            secret: accessTokenSecret,
        };

        const headers = oauth.toHeader(oauth.authorize(requestData, token));

        try {
            const response = await axios({
                url: url,
                method: method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                },
                params: method === "GET" ? params : undefined,
                data: method !== "GET" ? params : undefined,
            });

            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Erreur lors de l'appel à l'API Twitter:",
                    error.response?.data || error.message
                );
                throw new HttpsError(
                    'unknown',
                    "Échec de la requête à l'API Twitter",
                    {
                        message: error.message,
                        response: error.response?.data,
                        status: error.response?.status,
                    }
                );
            } else {
                console.error('Erreur inconnue:', error);
                throw new HttpsError(
                    'unknown',
                    'Erreur inconnue',
                    error.toString()
                );
            }
        }
    },
);
