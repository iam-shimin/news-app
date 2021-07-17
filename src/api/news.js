function load(key) {
  const usersAsJson = localStorage.getItem(key);
  const users = !!usersAsJson ? JSON.parse(usersAsJson) : [];
  return users;
}

if (process.env.REACT_APP_NYTIMES_APIKEY === 'PlaceApiKeyHere') {
  throw new Error('ApiKeyNotFound');
}

async function getArticleList(page = 0, limit = 15) {
  return fetch(
    `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.REACT_APP_NYTIMES_APIKEY}&limit=${limit}&page=${page}`
  ).then((res) => res.json());
}

async function getSectionList() {
  return fetch(
    `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${process.env.REACT_APP_NYTIMES_APIKEY}`
  ).then((res) => res.json());
}

async function addReadLater(userId, article) {
  const users = load("users");
  const matchedUser = users.find((user) => user.id === userId);

  if (!matchedUser) throw new Error("Requres to be logged in");

  const readLater = load("read-later");
  readLater.push(article);

  localStorage.setItem("read-later", JSON.stringify(readLater));

  return {
    success: true,
    data: readLater,
  };
}

async function getReadLaterList(userId) {
  const users = load("users");
  const matchedUser = users.find((user) => user.id === userId);

  if (!matchedUser) throw new Error("Requres to be logged in");

  return {
    success: true,
    data: load('read-later')
  }
}

const newsApi = { getArticleList, getSectionList, addReadLater, getReadLaterList };

export default newsApi;
