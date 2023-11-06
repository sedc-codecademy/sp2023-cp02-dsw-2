using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class PaymentCard : BaseEntity
    {
        public string CardNumber { get; set; } = string.Empty;
        public string CardholdersName { get; set; } = string.Empty;
        public DateTime ExpireDate { get; set; }
        public int Cvv { get; set; }
        public List<PaymentDetails> Payments { get; set; } = new List<PaymentDetails>();
    }
}
