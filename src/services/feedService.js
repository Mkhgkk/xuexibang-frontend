import http from "./httpService";

const apiEndPoint = "/feeds"

export function getFeeds() {
    return http.get(apiEndPoint);
}