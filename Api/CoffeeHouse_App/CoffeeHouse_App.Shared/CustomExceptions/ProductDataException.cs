using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Shared.CustomExceptions
{
    public class ProductDataException : Exception
    {
        public ProductDataException(string message) : base (message) { }
    }
}
