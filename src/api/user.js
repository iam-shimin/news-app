function getUsers() {
  const usersAsJson = localStorage.getItem("users");
  const users = !!usersAsJson ? JSON.parse(usersAsJson) : [];
  return users;
}

async function createUser(user) {
  const users = getUsers();
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
  const users = getUsers();
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
      success: true,
      data: matchedUser,
      token: matchedUser.id,
    };
  }

  throw new Error("Login Failed: Invalid Username or Password");
}

async function getUserById(userId) {
  const users = getUsers();
  const matchedUser = users.find((user) => user.id === userId);

  if (matchedUser) {
    return {
      success: true,
      data: matchedUser,
    };
  }

  throw new Error("User does't Exist");
}

async function updateUserById(userId, patch) {
  if (!patch) throw new Error("Bad Request");

  const users = getUsers();
  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, ...patch } : user
  );
  const matchedUser = updatedUsers.find((user) => user.id === userId);

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  if (matchedUser) {
    return {
      success: true,
      data: matchedUser,
    };
  }

  throw new Error("User does't Exist");
}

async function resetPassword(userId, payload) {
  const users = getUsers();
  const matchedUser = users.find((user) => user.id === userId);

  if (!matchedUser) throw new Error("Bad Request");

  if (matchedUser.password === payload.current_pwd) {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, password: payload.new_pwd } : user
    );
    const updatedUser = users.find((user) => user.id === userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return {
      success: true,
      data: updatedUser,
    };
  }

  throw new Error("Password Incorrect!");
}

const userApi = { createUser, login, getUserById, updateUserById, resetPassword };

export default userApi;
