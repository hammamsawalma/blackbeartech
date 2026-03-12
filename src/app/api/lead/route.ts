import { NextResponse } from 'next/server';

// Basic API route for contact form submissions
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simple honeypot check
    if (data.honeypot) {
      console.warn('Honeypot filled, rejecting submission as spam.');
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    
    // Here you would typically connect to an email service (Resend, SendGrid, etc.)
    // or log the lead directly into a database/CRM.
    
    console.log('--- NEW LEAD RECEIVED ---');
    console.log(`Name: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Phone: ${data.phone || 'N/A'}`);
    console.log(`Service: ${data.service || 'N/A'}`);
    console.log(`Message: ${data.message}`);
    console.log('---------------------------');
    
    // Return success response
    return NextResponse.json(
      { message: 'Message received successfully', success: true },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
