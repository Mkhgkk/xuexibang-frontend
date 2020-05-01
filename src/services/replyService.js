import http from "./httpService";

const apiEndPoint = "/reply"

export function getReplies(commentId) {
    return http.get(`${apiEndPoint}/${commentId}`);
}

export function postReply(commentId, content) {
    return http.post(`${apiEndPoint}/${commentId}`, {
        content: content
    });
}