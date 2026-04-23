const nodemailer = require("nodemailer");

const sendEmailOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
          
          <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:10px; padding:30px; text-align:center;">
            
            <h2 style="color:#2563eb; margin-bottom:10px;">
              ✔ Task Manager
            </h2>

            <p style="color:#333; font-size:16px; margin-bottom:20px;">
              We received a request to reset your password.
            </p>

            <div style="
              font-size:28px;
              font-weight:bold;
              letter-spacing:6px;
              color:#111;
              background:#f1f5f9;
              padding:15px;
              border-radius:8px;
              display:inline-block;
              margin-bottom:20px;
            ">
              ${otp}
            </div>

            <p style="color:#555; font-size:14px;">
              This OTP is valid for <b>5 minutes</b>.
            </p>

            <p style="color:#999; font-size:12px; margin-top:20px;">
              If you didn’t request this, you can safely ignore this email.
            </p>

          </div>

        </div>
      `,
    });

    console.log("Email OTP sent");
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmailOtp };