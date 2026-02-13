import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, subject, message, products } = data;

        if (!name || !email || !message) {
            return NextResponse.json(
                { message: 'Please complete the form and try again.' },
                { status: 400 }
            );
        }

        // Configure SMTP transporter
        // These should be set in your Hostinger environment variables or a .env file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const recipient = "info@clothingnexus.com";
        const emailSubject = `Website Contact: ${subject || 'New Inquiry'}`;

        let emailContent = `Name: ${name}\n`;
        emailContent += `Email: ${email}\n\n`;
        emailContent += `Subject: ${subject}\n\n`;
        emailContent += `Message:\n${message}\n\n`;

        if (products && Array.isArray(products)) {
            emailContent += "Requested Products:\n";
            products.forEach((product: any) => {
                emailContent += `- ${product.name} (ID: ${product.id})\n`;
            });
        }

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER || email}>`,
            to: recipient,
            subject: emailSubject,
            text: emailContent,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Thank you! Your message has been sent.' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Nodemailer error:', error);
        return NextResponse.json(
            {
                message: 'Oops! Something went wrong and we couldn't send your message.', error: error.message },
            { status: 500 }
        );
    }
}
