/* B"H
*/

import session from "./session";

const API_ROOT = process.env.VUE_APP_API_ROOT ?? 'http://localhost:3100/';

export async function api(url){
    try {
        const x = await fetch(API_ROOT + url);
        return await x.json();
    } catch (err) {
        session.Error(err);
    }
}