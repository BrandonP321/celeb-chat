export const Auth = {
  Login: "Login",
  LoginHeader: "Welcome Back! Time to Talk.",
  Register: "Register",
  RegisterHeader: "Create Your Gateway to Amazing Conversations.",
  LoggingIn: "Logging in",
  Registering: "Registering",
  ShowRegister: "Not part of our universe yet? No worries, you can ",
  RegisterNow: "create your account right away.",
  ShowLogin: "Already have an account? No problem, you can ",
  LoginNow: "log in from here.",
  ForgotPassword: "Uh-oh, forgot your password? Click here to reset it.",
  EmailOrUsername: "Email or username",

  Meta: {
    Title: (isLogin?: boolean) => (isLogin ? "Login" : "Register"),
  },

  InvalidEmail:
    "Hmm, that email doesn't look quite right. Check the format and try again!",

  Schema: {
    PassMinLength: (min: number) =>
      `Your password needs at least ${min} characters. Let's make it secure!`,
    PassMaxLength: (max: number) =>
      `Hold up, your password can't be more than ${max} characters. Let's shorten it a bit!`,
    PassRegexMatch:
      "Mix it up! Add at least 1 uppercase, 1 lowercase, and 1 number to your password.",
    PassRequired:
      "Don't forget to add a password. It's important for keeping your account secure!",
    PassConfirmNoMatch:
      "Oops, your passwords don't match. Try entering them again!",
    PassConfirmRequired: "Hold on, confirm your password so we know it's you!",
  },
  LoginSchema: {
    EmailOrUsernameRequired:
      "Looks like you forgot your email or username . Fill it in to continue!",
    PasswordRequired:
      "Oops, you skipped the password. We need that to log you in!",
  },
  SignupSchema: {
    EmailRequired:
      "Oops! It looks like you forgot to provide an email address.",
    UsernameMinLength: (min: number) =>
      `Your username needs to be at least ${min} characters long. Add a few more!`,
    usernameMaxLength: (max: number) =>
      `Whoa there, that's a long one! Keep your username under ${max} characters, please.`,
    usernameRegex:
      "Oops! Usernames can only include uppercase letters, lowercase letters, and numbers. No special characters allowed!",
    usernameRequired: "Let's get creative! Give us a username to continue.",
  },
};
