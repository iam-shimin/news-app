async function createUser(user) {
  const usersAsJson = localStorage.getItem("users");
  const users = !!usersAsJson ? JSON.parse(usersAsJson) : [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  if (!user) throw new Error('Bad Request');

  return {
    success: true,
    data: user,
  };
}

const userApi = { createUser };

export default userApi;
