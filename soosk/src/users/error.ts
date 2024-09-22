class UserExitsError extends Error {
  constructor() {
    super("User is already exists.");
  }
}

class UserNotExitsError extends Error {
  constructor() {
    super("User not exits.");
  }
}

export const UserError = {
  UserExitsError,
  UserNotExitsError,
} as const;
