import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields (name, email, message).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0a1d; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #8b5cf6;">
        <h2 style="color: #a78bfa; margin-top: 0;">📩 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #06b6d4;">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
          ${message.replace(/\n/g, '<br />')}
        </div>
      </div>
    `;

    const autoReplyHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0a1d; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #2e265c; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <!-- 3D Graphic Header Banner -->
        <div style="position: relative; background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%); text-align: center; border-bottom: 2px solid #8b5cf6; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" alt="3D Futuristic Graphic Header" style="width: 100%; height: 180px; object-fit: cover; opacity: 0.85; display: block;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, #0b0a1d, transparent); padding: 20px 0 10px 0;">
            <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">⚡ Thank You For Reaching Out</h2>
          </div>
        </div>

        <!-- Main Body Content -->
        <div style="padding: 28px 24px; line-height: 1.6; color: #e2e8f0; font-size: 15px;">
          <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p>Thank you for getting in touch through my portfolio website! I have received your message regarding "<strong>${subject || 'General Inquiry'}</strong>" and appreciate you reaching out.</p>

          <!-- 3D Core Specialization Badge -->
          <div style="background: rgba(139, 92, 246, 0.12); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 6px;">🤖 ☕ ⚡</div>
            <div style="color: #a78bfa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Core Specializations</div>
            <div style="color: #ffffff; font-size: 14px; margin-top: 6px; font-weight: 600;">Generative AI & RAG Workflows • Java Spring Boot • React & Next.js</div>
          </div>

          <p>Whether you would like to discuss software engineering opportunities, Generative AI application development, robust backend architectures, or collaborative projects, I will review your note and get back to you within 24 hours.</p>

          <!-- Call to action button -->
          <div style="text-align: center; margin: 28px 0;">
            <a href="https://linkedin.com/in/nikhil-kudale-dev/" target="_blank" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block; font-size: 14px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);">Connect on LinkedIn &rarr;</a>
          </div>

          <hr style="border: 0; border-top: 1px solid #2e265c; margin: 28px 0;" />

          <!-- Professional Signature -->
          <div style="display: flex; align-items: center; gap: 14px;">
            <div>
              <div style="font-weight: 700; color: #ffffff; font-size: 16px; letter-spacing: 0.3px;">Nikhil Kudale</div>
              <div style="color: #a78bfa; font-size: 13px; font-weight: 600; margin-top: 2px;">Full-Stack & Generative AI Engineer</div>
              <div style="color: #94a3b8; font-size: 13px; margin-top: 2px;">Software Developer</div>
              <div style="color: #64748b; font-size: 12px; margin-top: 4px;">📧 nikhilnkudale@gmail.com</div>
            </div>
          </div>
        </div>

        <div style="background-color: #05040d; padding: 14px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1e1b4b;">
          © ${new Date().getFullYear()} Nikhil Kudale. Portfolio & AI Engineering.
        </div>
      </div>
    `;

    // MODE 1: Gmail SMTP (Delivers 100% to ANY email address in the world!)
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER || 'nikhilnkudale@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
        },
      });

      // 1. Send Notification to Nikhil
      await transporter.sendMail({
        from: `"Nikhil Portfolio Contact" <${process.env.GMAIL_USER || 'nikhilnkudale@gmail.com'}>`,
        to: 'nikhilnkudale@gmail.com',
        replyTo: email,
        subject: `Portfolio Contact: ${name} sent you a message!`,
        html: notificationHtml,
      });

      // 2. Send Auto-Reply to Sender (Abhishek)
      await transporter.sendMail({
        from: `"Nikhil Kudale" <${process.env.GMAIL_USER || 'nikhilnkudale@gmail.com'}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        html: autoReplyHtml,
      });

      return NextResponse.json({ success: true, message: 'Delivered via Gmail SMTP!' });
    }

    // MODE 2: Resend API
    if (process.env.RESEND_API_KEY) {
      // 1. Send Notification Email to Nikhil
      await resend.emails.send({
        from: 'Nikhil Portfolio <onboarding@resend.dev>',
        to: ['nikhilnkudale@gmail.com'],
        replyTo: email,
        subject: `Portfolio Contact: ${name} sent you a message!`,
        html: notificationHtml,
      });

      // 2. Try sending Auto-Reply to Sender
      try {
        await resend.emails.send({
          from: 'Nikhil Kudale <onboarding@resend.dev>',
          to: [email],
          subject: `Thank you for reaching out, ${name}!`,
          html: autoReplyHtml,
        });
      } catch (autoErr) {
        console.warn('Resend auto-reply warning (Onboarding mode limits outside recipients):', autoErr);
      }

      return NextResponse.json({ success: true, message: 'Message delivered successfully!' });
    }

    // MODE 3: FormSubmit Fallback
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('_replyto', email);
    params.append('subject', subject || 'Portfolio Contact Form Message');
    params.append('message', message);

    await fetch('https://formsubmit.co/ajax/nikhilnkudale@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing email.' },
      { status: 500 }
    );
  }
}
