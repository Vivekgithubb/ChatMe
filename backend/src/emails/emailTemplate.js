export function createFuturisticWelcomeEmail(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connection Established :: Welcome to Messenger</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      /* Basic reset for email clients */
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    </style>
  </head>
  <body style="font-family: 'Exo 2', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #e0e0e0; background-color: #121212; margin: 0; padding: 20px;">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
            
            <tr>
              <td align="center" style="padding: 40px 20px; text-align: center; border-bottom: 1px solid #00FFFF;">
                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 0 10px rgba(0,255,255,0.7);">
                  MESSENGER
                </h1>
              </td>
            </tr>

            <tr>
              <td style="background-color: #1e1e2d; padding: 40px; border-radius: 0 0 12px 12px; border: 1px solid #333; border-top: 0;">
                
                <p style="font-size: 20px; margin-top: 0; margin-bottom: 25px;">
                  Hello <span style="color: #00FFFF; font-weight: 700;">${name}</span>,
                </p>
                
                <p style="font-size: 17px; color: #c0c0c0;">Welcome to the new era of connection. We're excited to have you join Messenger, the platform for seamless, real-time communication across the digital frontier.</p>
                
                <div style="background-color: #2a2a3a; padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #444;">
                  <h3 style="color: #00FFFF; margin-top: 0; font-size: 18px; font-weight: 500; letter-spacing: 1px;">Your First Missions:</h3>
                  <ul style="padding-left: 20px; margin: 0; color: #c0c0c0; list-style-type: disc;">
                    <li style="margin-bottom: 12px;">Activate Your Profile & Set Avatar</li>
                    <li style="margin-bottom: 12px;">Sync Your Comms Network</li>
                    <li style="margin-bottom: 12px;">Transmit Your First Message</li>
                    <li style="margin-bottom: 0;">Explore Secure Share Protocols</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${clientURL}" style="background: linear-gradient(to right, #6a11cb, #2575fc); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 700; display: inline-block; font-size: 16px; letter-spacing: 0.5px; box-shadow: 0 0 20px rgba(40, 116, 252, 0.5);">
                    ACTIVATE & OPEN MESSENGER
                  </a>
                </div>
                
                <p style="color: #c0c0c0; margin-bottom: 5px;">If you require assistance or encounter any anomalies, our support team is standing by.</p>
                <p style="color: #c0c0c0; margin-top: 0;">Happy messaging.</p>
                
                <p style="margin-top: 30px; margin-bottom: 0; color: #a0a0a0;">– The Messenger Operations Team</p>
              </td>
            </tr>
            
            <tr>
              <td style="text-align: center; padding: 30px; color: #777; font-size: 12px;">
                <p style="margin: 0 0 10px 0;">© 2025 Messenger. All rights reserved. Transmission ID: ${Math.random()
                  .toString(36)
                  .substring(2, 10)}</p>
                <p style="margin: 0;">
                  <a href="#" style="color: #2575fc; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                  <a href="#" style="color: #2575fc; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
              </td>
            </tr>
            
          </table>
          
        </td>
      </tr>
    </table>
    
  </body>
  </html>
  `;
}
