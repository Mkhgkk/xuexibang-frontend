import http from "./httpService";

const apiEndPoint = "/universities";

export function getUniversities() {
  return http.get(apiEndPoint);
}

export function getUniversity(id) {
  return http.get(apiEndPoint + "/" + id);
}
