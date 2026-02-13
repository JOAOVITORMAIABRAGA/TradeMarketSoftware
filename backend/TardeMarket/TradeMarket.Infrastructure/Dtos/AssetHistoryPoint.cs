using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TradeMarket.Infrastructure.Dtos
{
    public class AssetHistoryPoint
    {
        public DateTime Date { get; set; }
        public decimal ClosePrice { get; set; }
    }

}
