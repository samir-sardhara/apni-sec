import { Resend } from 'resend';
import { Issue } from '../types';

class EmailService {
  private resend: Resend | null;
  private fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY not set. Email functionality will be disabled.');
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  }

  async sendWelcomeEmail(to: string, name?: string): Promise<void> {
    if (!this.resend) {
      console.log('Email service disabled. Would send welcome email to:', to);
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: 'Welcome to ApniSec - Your Cybersecurity Partner',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to ApniSec!</h1>
              </div>
              <div class="content">
                <h2>Hello ${name || 'there'}!</h2>
                <p>Thank you for joining ApniSec, your trusted partner in cybersecurity solutions.</p>
                <p>We're excited to help you secure your digital assets with our comprehensive security services:</p>
                <ul>
                  <li><strong>Cloud Security</strong> - Protect your cloud infrastructure</li>
                  <li><strong>Reteam Assessment</strong> - Evaluate your security team's capabilities</li>
                  <li><strong>VAPT</strong> - Vulnerability Assessment and Penetration Testing</li>
                </ul>
                <p>Get started by logging into your dashboard and creating your first security issue.</p>
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" class="button">Go to Dashboard</a>
                <p style="margin-top: 30px; font-size: 12px; color: #666;">
                  If you have any questions, feel free to reach out to our support team.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw - email failures shouldn't break registration
    }
  }

  async sendIssueCreatedEmail(to: string, issue: Issue): Promise<void> {
    if (!this.resend) {
      console.log('Email service disabled. Would send issue created email to:', to);
      return;
    }

    try {
      const typeLabels: Record<string, string> = {
        'cloud-security': 'Cloud Security',
        'reteam-assessment': 'Reteam Assessment',
        'vapt': 'VAPT',
      };

      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: `New Issue Created: ${issue.title}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .issue-card { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
              .label { font-weight: bold; color: #667eea; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Issue Created</h1>
              </div>
              <div class="content">
                <p>Your security issue has been successfully created and is now being tracked.</p>
                <div class="issue-card">
                  <p><span class="label">Type:</span> ${typeLabels[issue.type] || issue.type}</p>
                  <p><span class="label">Title:</span> ${issue.title}</p>
                  <p><span class="label">Description:</span> ${issue.description}</p>
                  ${issue.priority ? `<p><span class="label">Priority:</span> ${issue.priority}</p>` : ''}
                  ${issue.status ? `<p><span class="label">Status:</span> ${issue.status}</p>` : ''}
                </div>
                <p>You can view and manage this issue in your dashboard.</p>
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">View Dashboard</a>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Failed to send issue created email:', error);
    }
  }

  async sendProfileUpdatedEmail(to: string): Promise<void> {
    if (!this.resend) {
      console.log('Email service disabled. Would send profile updated email to:', to);
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: 'Profile Updated Successfully',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Profile Updated</h1>
              </div>
              <div class="content">
                <p>Your profile has been successfully updated.</p>
                <p>If you did not make this change, please contact our support team immediately.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Failed to send profile updated email:', error);
    }
  }
}

export default new EmailService();

