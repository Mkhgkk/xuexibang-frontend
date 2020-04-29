import http from "./httpService";

const apiEndPoint = "/universities";

export function getUniversities() {
  return http.get(apiEndPoint);
}
