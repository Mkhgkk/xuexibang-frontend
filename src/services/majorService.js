import http from "./httpService";

const apiEndPoint = "/majors";

export function getMajors() {
  return http.get(apiEndPoint);
}

export function getMajor(id) {
  return http.get(apiEndPoint + "/" + id);
}
