const noSpecialChars = /^[a-zA-Z0-9]+$/;

export function validatePassword(password) {
  if (password > 20) {
    return `Password should be max 20 characters`;
  } else if (!noSpecialChars.test(password)) {
    return `Password should not contain special characters characters`;
  }
  return null;
}

export function validateDisplayName(displayName) {
  if (!noSpecialChars.test(displayName)) {
    return `DisplayName should not contain special characters characters`;
  }
  return null;
}
