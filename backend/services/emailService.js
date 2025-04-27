// utils/emailService.js

export const sendOrderConfirmationEmail = async (email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email, // Send to the email passed in the request
            subject: 'Order Confirmation',
            text: `Thank you for your order! Your order has been successfully placed. You will receive your order in 2 weeks.`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent successfully");
    } catch (err) {
        console.error("Error sending email:", err);
        throw new Error("Failed to send confirmation email");
    }
};
