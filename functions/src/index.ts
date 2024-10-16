/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {CallableRequest} from "firebase-functions/lib/common/providers/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const { HttpsError, onCall } = require("firebase-functions/v2/https");
const { createHmac } = require("crypto");
const axios = require("axios");
const OAuth = require("oauth-1.0a");
const dotenv = require("dotenv");

dotenv.config();

// Déclaration du type `CallableRequest` sans l'importer directement en CommonJS
/**
 * @typedef {import("firebase-functions/v2/https").CallableRequest} CallableRequest
 */

// functions.config().twitter.consumer_key
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// Création d'une instance OAuth
function getOAuth() {
    return new OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret,
        },
        signature_method: 'HMAC-SHA1',
        hash_function(baseString: string, key: string) {
            return createHmac('sha1', key).update(baseString).digest('base64');
        },
    });
}

// Fonction Cloud pour proxy Twitter
    exports.twitterProxy = onCall(async (/** @type {CallableRequest} */ request: CallableRequest) => {

        // Vérifier l'authentification de l'utilisateur
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'L\'utilisateur doit être authentifié.');
    }

    const { url, method, params, accessToken, accessTokenSecret } = request.data;

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
                'Content-Type': 'application/json',
            },
            params: method === 'GET' ? params : undefined,
            data: method !== 'GET' ? params : undefined,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error('Erreur lors de l\'appel à l\'API Twitter:', error.response?.data || error.message);
            throw new HttpsError('unknown', 'Échec de la requête à l\'API Twitter', error);
        } else {
            const err = error as Error;
            throw new HttpsError('unknown', 'Erreur inconnue', err);
        }
    }
});