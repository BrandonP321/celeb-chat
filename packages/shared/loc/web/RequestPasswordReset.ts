export const RequestPassReset = {
  PageTitle: "Reset Your Password",
  PageBlurb:
    "It happens to everyone. Let's get you back in the game. Enter the email address you used when you joined and we'll send you instructions to reset your password.",

  Form: {
    SuccessMsg: "Email to request password reset has been sent!",
    SubmitBtn: "Send email",
    SubmitBtnLoading: "Sending email",
    WarningMsg:
      "A friendly reminder: We will only send a password reset link if your email is in our database. No sight of it? Your spam folder might hold the answer.",
  },

  Meta: {
    Title: "Reset Password",
  },

  Schema: {
    EmailRequired: "Looks like you forgot your email. Fill it in to continue!",
  },

  APIErrors: {
    EmailRequired:
      "Oops! Looks like you forgot to enter your email. We need it to send you the password reset link.",
    UnableToSendEmail:
      "Yikes! We're having a little trouble sending the password reset link to your email. Could you please double-check your email address or try again later?",
  },
} as const;
