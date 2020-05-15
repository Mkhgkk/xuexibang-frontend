import http from "./httpService";

const apiEndPoint = "/courses";

export function getCourses() {
  return http.get(apiEndPoint);
}

export function getSearchedCourse(number) {
  return http.get(apiEndPoint + "/search/" + number);
}

export function getCourse(id) {
  return http.get(apiEndPoint + "/course/" + id);
}

export function getMyCourses() {
  return http.get(apiEndPoint + "/myCourses");
}

export function getAdminCourses() {
  return http.get(apiEndPoint + "/admin");
}

export function getStudent(id) {
  return http.get(`${apiEndPoint}/${id}/students`);
}

export function newCourse(course) {
  return http.post(apiEndPoint, course);
}

export function saveCourse(course) {
  return http.put(apiEndPoint + "/" + course._id, {
    _id: course._id,
    laoshi: course.laoshi,
    weeks: course.weeks,
    time: course.time,
    classroom: course.classroom,
    qqNumber: course.qqNumber,
    notes: course.notes,
    admin: course.admin
  });
}

export function deleteCourse(id) {
  return http.delete(apiEndPoint + "/" + id);
}
