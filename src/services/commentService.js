import http from "./httpService";

const apiEndPoint = "/comment"

export function getComments(feedId) {
    return http.get(`${apiEndPoint}/${feedId}`);
}

export function postComment(feedId, content) {
    return http.post(`${apiEndPoint}/${feedId}`, {
        content: content
    });
}