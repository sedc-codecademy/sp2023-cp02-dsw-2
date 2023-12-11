using CoffeeHouse_App.Domain.Entities;

namespace CoffeeHouse_App.Services.Abstractions
{
    public interface IEmailService
    {
        void SendEmail(Message message);

        void SendForgotPassEmail(Message message);
    }
}
