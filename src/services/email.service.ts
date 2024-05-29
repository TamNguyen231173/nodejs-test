import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from '~/configs'
import { logger } from '~/configs/logger.config'
import {EmailBody} from "~/types/auth.type";

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })

  public async sendMail(emailBody: EmailBody) {
    const mailOptions = {
      from: EMAIL_USER,
      ...emailBody
    }

    const info = await this.transporter.sendMail(mailOptions)
    logger.info(`Email sent: ${info.messageId}`)
  }
}

const emailService = new EmailService()
export default emailService
