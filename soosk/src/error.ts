class NotAllowedError extends Error {
  constructor() {
    super("Not allowed.");
  }
}

export const GeneralError = {
  NotAllowedError,
} as const;
