import http from "./httpService";

const apiEndPoint = "/majors";

export function getMajors() {
  return http.get(apiEndPoint);
}
