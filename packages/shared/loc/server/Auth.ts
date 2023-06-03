export const Auth = {
  EmailTaken: "Oops, this email is already in use. Try another!",
  UsernameTaken: "Looks like that username's taken. Give another one a whirl!",
  InvalidFieldInput: "Registration fields don't meet the required format",
  InvalidEmailOrPass:
    "Oops, something's not right. Double-check your email and password and try again!",

  /* Registration */
  NoTokensGenerated: "No tokens were generated during registration.",

  /* Login */
  NoTokensDuringLogin: "No tokens were generated during login.",
} as const;
