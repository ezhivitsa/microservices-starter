# Authorization backend service

Microservices service for sending emails.

We use [mailgun](https://www.mailgun.com/) for sending emails. To generate emails we use [mjml](https://mjml.io/).

Here we have the following list of emails (stored in [resources/emails](./resources/emails)):

1. Signup email with link to verify email
2. Forgot password email with link to reset password page

For development purposes we don't send emails but save to the directory [resources/sent]('./resources/sent).
