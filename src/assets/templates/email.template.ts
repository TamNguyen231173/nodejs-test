import { EXPIRES_IN_VERIFIED_CODE } from '~/configs'
import {VerifyCode} from "~/types/user.type";

export const emailTemplates = {
  verifyEmail: (verifyCode: VerifyCode) => {
    return generateTemplate({
      title: 'Verify your email address',
      content: 'Please verify your email address to complete your account:',
      warning: `This verified code will expire in ${EXPIRES_IN_VERIFIED_CODE} minutes. If it has expired, try to request a new verification email.`,
      code: verifyCode.code,
      nameApp: 'Employee Task Management',
      logo: 'https://i.pinimg.com/564x/74/1f/98/741f98011b83f5203c758bb8d73fc969.jpg'
    })
  },
  forgotPassword: (verifyCode: VerifyCode) => {
    return generateTemplate({
      title: 'Reset your password',
      content: 'Please reset your password to continue:',
      warning: `This verified code will expire in ${EXPIRES_IN_VERIFIED_CODE} minutes. If it has expired, try to request a new verification email.`,
      code: verifyCode.code,
      nameApp: 'Employee Task Management',
      logo: 'https://i.pinimg.com/564x/74/1f/98/741f98011b83f5203c758bb8d73fc969.jpg'
    })
  }
}

function generateTemplate(config: {
  title: string
  content: string
  warning?: string
  code: string
  note?: string
  nameApp: string
  logo: string
}) {
  return `<html>
  <head>
    <style>
        body {
            font-family: sans-serif;
        }

        .controls-section {
            text-align: center;
        }

        .noti-box {
            padding: 1.5rem 0;
            background: #FFCC08;
            color: #171725;
        }

        .noti-box h4 {
            color: #171725;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            font-weight: normal;
        }

        .noti-box p {
            font-size: 1.6rem;
            font-weight: bold;
            letter-spacing: 1.2rem;
        }
    </style>
  </head>

  <body>
  <div style="background: #f2f6ff; padding: 24px 0">
    <div style="margin-left: auto;margin-right: auto;margin-bottom: 24px;width: 56px;">
      <img src="${config.logo}" height="56" width="56" />
    </div>
    <div style="
            padding: 24px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            width: 530px;
            margin: 0 auto;
            box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.05);
            background-color: #fff;
            text-align: justify;
          ">
      <h1 style="margin: 0;text-align: center; color: rgb(17, 5, 63)">
        ${config.title}
      </h1>
      <p style="
              margin-top: 4px;
              font-weight: 400;
              font-size: 18px;
              margin-bottom: 6px;
              color: #333;
            ">
        ${config.content}
      </p>
      <p style="
              margin-bottom: 6px;
              font-size: 13px;
              margin-top: 0;
              font-weight: 600;
              color: #555;
              font-style: italic;
            ">
        ${config.warning ? config.warning : ''}
      </p>
      ${config.note ? config.note : ''}
      <div class="controls-section">
        <div class="noti-box">
          <h4>This is your code: </h4>
          <p>${config.code}</p>
        </div>
      </div>
    </div>
    <div style="width: fit-content; margin: 0 auto">
      <div style="
              font-weight: 700;
              margin-top: 24px;
              vertical-align: middle;
              position: relative;
              text-align: center;
            ">
        <div style="display: inline-block; vertical-align: middle; height: 35px">
          <img src="${config.logo}" height="24" width="24" style="
                  margin-right: 8px;
                  display: block;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                " />
        </div>
        <div style="
                color: rgb(17, 5, 63);
                display: inline-block;
                line-height: 35px;
                margin-left: 24px;
              ">
          ${config.nameApp}
        </div>
      </div>
      <div style="font-size: 13px; margin-bottom: 24px; margin-top: 4px">
        You're receiving this email from ${config.nameApp}.
      </div>
    </div>
  </div>
  </body>

  </html>`
}

export default emailTemplates
