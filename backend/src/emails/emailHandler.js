import { resendClient, sender } from "../lib/resend.js";
import { createFuturisticWelcomeEmail } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to ChatMe!",
    html: createFuturisticWelcomeEmail(name, clientURL),
  });
  if (error) {
    console.log("error sending email", error);
    throw new Error(error);
  }
  console.log("Email sent succesfully ");
};
