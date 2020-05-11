import http from "./httpService";

const apiEndPoint = "/feeds";

export function getFeeds() {
  return http.get(apiEndPoint);
}

export function getHomework() {
  return http.get(apiEndPoint + "/homework");
}

export function getAnnouncement() {
  return http.get(apiEndPoint + "/announcements");
}

export function getHomeworkById(id) {
  return http.get(`${apiEndPoint}/${id}/homework`);
}

export function getAnnouncementById(id) {
  return http.get(`${apiEndPoint}/${id}/announcements`);
}

export function newFeed(feed) {
  return http.post(apiEndPoint, feed);
}

export function saveFeed(feed) {
  return http.put(`${apiEndPoint}/${feed._id}`, feed);
}

export function deleteFeed(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}
