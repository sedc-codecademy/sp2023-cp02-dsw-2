using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class PaymentDetails : BaseEntity
    {
        public PaymentCard PaymentCard { get; set; }
        public int PaymentCardId { get; set; }
        public OrderDetails OrderDetails { get; set; }
    }
}
