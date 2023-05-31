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
};
