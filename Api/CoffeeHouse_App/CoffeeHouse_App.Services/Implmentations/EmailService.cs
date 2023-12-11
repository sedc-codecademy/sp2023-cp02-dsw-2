using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs;
using CoffeeHouse_App.Services.Abstractions;
using MailKit.Net.Smtp;
using MimeKit;

namespace CoffeeHouse_App.Services.Implmentations
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfiguration;

        public EmailService(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }
        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        public void SendForgotPassEmail(Message message)
        {
            var emailMessage = CreateForgotPassEmailMessage(message);
            Send(emailMessage);
        }

        private MimeMessage CreateForgotPassEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Coffee House", _emailConfiguration.From));
            emailMessage.To.AddRange(message.To);

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <p>Dear</p>
    
                <p>We received a request to reset the password associated with your account. If you did not make this request, you can ignore this email.</p>
    
                <p>To reset your password, please click on the following link:</p>
    
                <p><a href=""{message.Content}"">Reset Password Link</a></p>
    
                <p>This link is valid for [Expiration Time]. After this time, you will need to request another password reset.</p>

                <p>If you have any questions or need further assistance, please contact our support team at 'coffeehousesedc1@gmail.com'</p>
    
                <p>Best regards,<br/>
                Coffee House Team</p>
            ";

            emailMessage.Subject = message.Subject;
            emailMessage.Body = builder.ToMessageBody();

            return emailMessage;
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Coffee House", _emailConfiguration.From));
            emailMessage.To.AddRange(message.To);

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <p>Welcome,</p>
    
                <p>Thank you for registering with Coffee House! We're excited to have you on board.</p>
    
                <p>To activate your account, please click on the link below:</p>
    
                <p><a href=""{message.Content}"">Confirm Your Account</a></p>
    
                <p>If you didn't request this confirmation, please ignore this email.</p>
    
                <p>Best regards,<br/>
                Coffee House Team</p>
            ";

            emailMessage.Subject = message.Subject;
            emailMessage.Body = builder.ToMessageBody();

            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using var client = new SmtpClient();
            try
            {
                client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfiguration.UserName, _emailConfiguration.Password);

                client.Send(mailMessage);
            }
            catch (Exception ex)
            {
                //log an error message or throw an exception or both
                throw new Exception(ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
