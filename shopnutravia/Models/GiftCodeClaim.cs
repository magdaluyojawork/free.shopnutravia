namespace shopnutravia.Models
{
    public class GiftCodeClaim
    {
        public int GiftCodeClaimID { get; set; }
        public string GiftCode { get; set;  }
        public string OrderNo { get; set;   }
        public string ClaimedDate { get; set;   }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
