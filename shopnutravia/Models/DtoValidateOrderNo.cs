namespace shopnutravia.Models
{
    public class DtoValidateOrderNo
    {
        public GiftCode GiftCodes { get; set; }
        public bool HasFreeGift { get; set; }
        public bool HasClaimedGift { get; set; }
    }
}
