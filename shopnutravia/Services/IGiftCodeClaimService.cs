using shopnutravia.Models;

namespace shopnutravia.Services
{
    public interface IGiftCodeClaimService
    {
        //public List<GiftCode> FreeGifts(string OrderNo);
        public GiftCode FreeGifts(string OrderNo);
        public bool IsFreeGiftClaimed(string OrderNo);
        public bool SendGiftCodes(string Email, string Name, string GiftCode);
        public void UpdateClaimedGifts(string OrderNo, string GiftCode, string Name, string Email);
    }
}
