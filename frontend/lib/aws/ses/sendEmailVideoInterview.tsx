"use server"
import type { SendEmailCommandInput } from "@aws-sdk/client-ses";
import { SES } from "@aws-sdk/client-ses";

const ses = new SES({ region: process.env.AWS_SES_REGION });

const logoLink = "https://firebasestorage.googleapis.com/v0/b/quantoflow-3af95.appspot.com/o/public%2Flogo.png?alt=media&token=627a41cf-96c3-4aed-930a-eecdcff81213"

export async function sendAWSEmail(toEmail: string, subject: string) {
    const emailHtml = `    <div style="background-color: #e6f7e6; padding: 20px; font-family: Arial, sans-serif; color: #333;">
        <div
            style="max-width: 600px; margin: 0 auto; border-radius: 8px; background-color: #ffffff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <img src="${logoLink}" alt="Quantoflow Logo"
                style="width: 150px; margin-bottom: 20px;" />
            <h2 style="color: #333; font-size: 24px; font-weight: bold;">Know Your Founder</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #666;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #666;">
                I hope you're doing well! I'm conducting a reference check for [PERSON X], who worked with you at [COMPANY Y]. Could you kindly confirm if you collaborated with him? I'd also appreciate your feedback on his strengths, growth areas, work style, and any challenges you encountered. Thanks!
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #666;">You can now provide reference check by clicking the link below:
            </p>
            <a href="https://app.quantoflow.com/" target="_blank"
                style="display: inline-block; margin-top: 15px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4d56a1; border-radius: 5px; text-decoration: none;">Login
                Here</a>
            <p style="font-size: 12px; line-height: 1.4; color: #999; margin-top: 20px;">If you have any questions, feel
                free to contact support.</p>
        </div>
    </div>`
    const params: SendEmailCommandInput = {
        Source: "michael@quantoflow.com",
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    };

    await ses.sendEmail(params);
    console.log(`successfully sent email to: ${toEmail}`)
}


export async function sendClientPortalEmail(toEmail: string, subject: string, name: string, formLink: string) {

    const emailHtml = ` <div style="background-color: #e6f7e6; padding: 20px; font-family: Arial, sans-serif; color: #333;">
  <div
      style="max-width: 600px; margin: 0 auto; border-radius: 8px; background-color: #ffffff; padding: 20px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <img src="${logoLink}" alt="Quantoflow Logo"
          style="width: 150px; margin-bottom: 20px;" />
      <h2 style="color: #333; font-size: 24px; font-weight: bold;">Welcome to Know Your Founder</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">Hello ${name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">
      We have created a client portal to collect information about your business to fulfill new regulatory requirements
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">You can now log in and submit documents by clicking the link below:
      </p>
      <a href="${formLink}" target="_blank"
          style="display: inline-block; margin-top: 15px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Login
          Here</a>
      <p style="font-size: 12px; line-height: 1.4; color: #999; margin-top: 20px;">If you have any questions, feel
          free to contact support.</p>
  </div>
</div>`
    const params: SendEmailCommandInput = {
        Source: "michael@quantoflow.com",
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    };

    await ses.sendEmail(params);
    console.log(`successfully sent email to: ${toEmail}`)
}

export async function sendReviewEmail(toEmail: string, subject: string, reviewLink: string) {

    const emailHtml = ` <div style="background-color: #e6f7e6; padding: 20px; font-family: Arial, sans-serif; color: #333;">
  <div
      style="max-width: 600px; margin: 0 auto; border-radius: 8px; background-color: #ffffff; padding: 20px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <img src="${logoLink}" alt="Quantoflow Logo"
          style="width: 150px; margin-bottom: 20px;" />
      <h2 style="color: #333; font-size: 24px; font-weight: bold;"></h2>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">
     A new CDD case awaits approval
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #666;">You can now log in and submit documents by clicking the link below:
      </p>
      <a href="${reviewLink}" target="_blank"
          style="display: inline-block; margin-top: 15px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Go to case</a>

  </div>
</div>`
    const params: SendEmailCommandInput = {
        Source: "michael@quantoflow.com",
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    };

    await ses.sendEmail(params);
    console.log(`successfully sent email to: ${toEmail}`)
}