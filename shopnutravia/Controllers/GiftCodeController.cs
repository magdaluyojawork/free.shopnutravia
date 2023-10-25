using Microsoft.AspNetCore.Mvc;
using shopnutravia.Models;
using shopnutravia.Services;

namespace shopnutravia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftCodeController : Controller
    {
        private readonly IGiftCodeClaimService _giftCodeClaimService;
        public GiftCodeController(IGiftCodeClaimService giftCodeClaimService) {
            _giftCodeClaimService = giftCodeClaimService;
        }
    }
}
