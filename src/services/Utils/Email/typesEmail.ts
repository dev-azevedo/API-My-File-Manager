export interface IEmailProps {
  toEmail: string;
  subject: string;
  html: string;
  attachments?: Array<IAttachmentsEmailProps>;
}

export interface IAttachmentsEmailProps {
  filename: string;
  path: string;
}
