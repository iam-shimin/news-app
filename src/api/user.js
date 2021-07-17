async function createUser(user) {
  const usersAsJson = localStorage.getItem("users");
  const users = !!usersAsJson ? JSON.parse(usersAsJson) : [];
  user.id = Date.now();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  if (!user) throw new Error("Bad Request");

  return {
    success: true,
    data: user,
  };
}

async function login(credentials) {
  const usersAsJson = localStorage.getItem("users");
  const users = !!usersAsJson ? JSON.parse(usersAsJson) : [];
  const userGetter = credentials.token
    ? (user) => Number(credentials.token) === user.id
    : (user) => user.display_name === credentials.display_name;
  const matchedUser = users.find(userGetter);

  const isValid =
    matchedUser &&
    (credentials.password
      ? matchedUser.password === credentials.password
      : true);

  if (isValid) {
    return {
      status: 200,
      success: true,
      data: matchedUser,
      token: matchedUser.id,
    };
  }

  throw new Error("Login Failed: Invalid Username or Password");
}

const userApi = { createUser, login };

export default userApi;
