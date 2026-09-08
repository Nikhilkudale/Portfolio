import { NextResponse } from 'next/server';

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

    // Auto-response text for sender
    const autoResponseMsg = `Hi ${name},

Thank you for reaching out through my portfolio website! I have received your message regarding "${subject || 'General Inquiry'}" and appreciate you taking the time to connect.

Whether you would like to discuss software engineering opportunities, Generative AI / RAG application development, Java Spring Boot backends, or collaborative projects, I will review your message and get back to you within 24 hours.

In the meantime, feel free to connect with me:
• LinkedIn: https://linkedin.com/in/nikhil-kudale-dev/
• Email: nikhilnkudale@gmail.com

Best regards,

Nikhil Kudale
Full-Stack & Generative AI Engineer
Software Developer
Bengaluru, India`;

    // Forward to FormSubmit server-to-server
    const response = await fetch('https://formsubmit.co/ajax/nikhilnkudale@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        subject: subject || 'Portfolio Contact Form Message',
        message,
        _subject: `Portfolio Contact: ${name} sent you a message!`,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: autoResponseMsg,
      }),
    });

    const data = await response.json();

    if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || 'Error delivering message.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error delivering message. Please try again later.' },
      { status: 500 }
    );
  }
}
