import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password
  });
}

export function deleteUser(email, password) {
  return http.delete(apiEndPoint, {
    email,
    password
  });
}

export function getUserDetail() {
  return http.get(apiEndPoint + "/me");
}

export function changePassword(email, password, newPassword) {
  return http.put(apiEndPoint + "/password", {
    email,
    password,
    newPassword
  });
}

export function changeUserInfo(user) {
  return http.put(apiEndPoint, user);
}
