using Microsoft.AspNetCore.Mvc;
using shopnutravia.Models;
using shopnutravia.Services;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shopnutravia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
        private readonly IGiftCodeClaimService _giftCodeClaimService;
        public GiftController(IGiftCodeClaimService giftCodeClaimService)
        {
            _giftCodeClaimService = giftCodeClaimService;
        }

        [HttpGet("{id}")]
        public DtoValidateOrderNo Get(string id)
        {
            DtoValidateOrderNo dto = new DtoValidateOrderNo();

            bool isClaimed = _giftCodeClaimService.IsFreeGiftClaimed(id);
            var gift = _giftCodeClaimService.FreeGifts(id);
            
            dto.HasFreeGift = gift==null?false:true;
            dto.GiftCodes = gift;
            dto.HasClaimedGift = isClaimed;
        
            return dto;
        }
        // POST api/<GiftController>
        [HttpPost]
        public bool Post(SendGift send)
        {
            var gift = _giftCodeClaimService.FreeGifts(send.OrderNo);
            if (gift!= null)
            {
                //foreach (GiftCode gift in gifts)
                //{
                    bool isClaimed = _giftCodeClaimService.IsFreeGiftClaimed(send.OrderNo);
                    if (!isClaimed) {
                        bool isEmailSent = _giftCodeClaimService.SendGiftCodes(send.Email, send.Name, gift.Code);
                        if(isEmailSent)
                            _giftCodeClaimService.UpdateClaimedGifts(send.OrderNo, gift.Code, send.Name, send.Email);
                    }
                    
                //}
                //Ok();
                return true;
            }
            else
            {
                //NotFound();
                return false;
            }
        }
    }
}
