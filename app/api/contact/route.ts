import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

interface ContactFormData {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.projectType || !data.budget || !data.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      // Fallback: Log the submission
      console.log("=== New Freelance Inquiry ===")
      console.log(`Name: ${data.name}`)
      console.log(`Email: ${data.email}`)
      console.log(`Project Type: ${data.projectType}`)
      console.log(`Budget: ${data.budget}`)
      console.log(`Message: ${data.message}`)
      console.log("=============================")
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Thank you for your inquiry! I'll get back to you within 24-48 hours." 
        },
        { status: 200 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Get the recipient email - IMPORTANT: With Resend free tier, 
    // you can only send to the email you signed up with
    const recipientEmail = process.env.CONTACT_EMAIL || "hanzala.saify103@gmail.com"

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Freelance Inquiry: ${data.projectType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0e14; color: #e0e0e0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1a1f2e; border-radius: 12px; padding: 30px; border: 1px solid #2a3441; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #00ff41; margin: 0; font-size: 24px; }
            .header p { color: #888; margin-top: 5px; }
            .field { margin-bottom: 20px; padding: 15px; background: #0d1117; border-radius: 8px; border-left: 3px solid #00ff41; }
            .field-label { color: #00ff41; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .field-value { color: #fff; font-size: 16px; }
            .message-box { background: #0d1117; padding: 20px; border-radius: 8px; border: 1px solid #2a3441; margin-top: 20px; }
            .message-box p { color: #e0e0e0; line-height: 1.6; white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #2a3441; color: #666; font-size: 12px; }
            .badge { display: inline-block; background: #00ff4120; color: #00ff41; padding: 5px 12px; border-radius: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Freelance Inquiry</h1>
              <p>Someone wants to work with you!</p>
            </div>
            
            <div class="field">
              <div class="field-label">Client Name</div>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${data.email}" style="color: #00ff41;">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Project Type</div>
              <div class="field-value"><span class="badge">${data.projectType}</span></div>
            </div>
            
            <div class="field">
              <div class="field-label">Budget Range</div>
              <div class="field-value"><span class="badge">${data.budget}</span></div>
            </div>
            
            <div class="message-box">
              <div class="field-label">Project Details</div>
              <p>${data.message}</p>
            </div>
            
            <div class="footer">
              <p>This inquiry was sent from your portfolio contact form.</p>
              <p>Reply directly to this email to respond to ${data.name}.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: `Email service error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log("Email sent successfully:", emailData)

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your inquiry! I'll get back to you within 24-48 hours." 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    )
  }
}
