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
} as const;
