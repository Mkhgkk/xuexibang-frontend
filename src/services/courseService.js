import http from "./httpService";

const apiEndPoint = "/courses";

export function getCourses() {
  return http.get(apiEndPoint);
}

export function getSearchedCourse(number) {
  return http.get(apiEndPoint + "/search/" + number);
}
