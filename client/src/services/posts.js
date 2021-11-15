/* B"H
*/

import { api } from "./myFetch";



export function GetAll() {
    return api('posts');
}

export function GetWall(handle) {
    return api('posts/wall/' + handle);
}

export function GetFeed(handle) { 
    return api('posts/feed/' + handle);   
}


export function Get(post_id) { return api('posts/' + post_id); }
export function Add(post) {
     return { ...post };
}
export function Update(post_id, post) {
    return { post_id, post};
}
export function Delete(post_id) {
    return api('posts/' + post_id, {}, 'DELETE');
} 