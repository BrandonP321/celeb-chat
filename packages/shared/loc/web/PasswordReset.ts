export const PassReset = {
  PageTitle: "New Password, Fresh Start",
  PageBlurb:
    "Looks like it's time for a change, huh? Enter your new password below and get back to making those iconic chats!",

  Form: {
    successMsg: "Password has been reset!",
    SubmitBtn: "Reset password",
    SubmitBtnLoading: "Resetting password",
    WarningMsg:
      "Attention: You're on the right page only if you've clicked through from our password reset email. The link contains important data needed to get you back chatting!",
  },

  Meta: {
    Title: "Reset Password",
  },

  APIErrors: {
    BadURL:
      "Hm, something seems off. Could you please check the password reset email we sent you and click on the link provided there?",
    ExpiredRequest:
      "Oh no, looks like this password reset request has expired. No worries though, you can request a new one on the login page",
  },
} as const;
