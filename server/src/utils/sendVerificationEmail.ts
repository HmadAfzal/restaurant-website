
import VerificationEmail from "../emails/verificationEmail.jsx";
import { resend } from "../lib/resend.js";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    console.log(email,username,verifyCode)
    console.log('sending email ii')

    await resend.emails.send({
      from: "onboarding@resend.dev>",
      to: email,
      subject: ' Verification Code',
       react: VerificationEmail({username,verifyCode}),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}