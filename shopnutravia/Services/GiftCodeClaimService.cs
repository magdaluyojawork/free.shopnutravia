using shopnutravia.Models;
using System.Net;
using Humanizer;
using MimeKit;
using Org.BouncyCastle.Asn1.Pkcs;

using MailKit.Net.Smtp;
using MailKit;
using System.Linq;

namespace shopnutravia.Services
{
    public class GiftCodeClaimService:IGiftCodeClaimService
    {
        private readonly ShopnutraviaDBContext _appDBContext;
        private readonly AppSettingModel _appSettingModel;

        public GiftCodeClaimService(ShopnutraviaDBContext appDBContext, AppSettingModel appSettingModel) {
            _appDBContext = appDBContext;
            _appSettingModel = appSettingModel;
        }
        public bool IsFreeGiftClaimed(string OrderNo)
        {
            var gift = _appDBContext.GiftCodeClaims.FirstOrDefault(x => x.OrderNo == OrderNo);
            return gift == null ? false : true;
        }
        //public List<GiftCode> FreeGifts(string OrderNo)
        public GiftCode FreeGifts(string OrderNo)
        {
            var claimedGiftCodes = _appDBContext.GiftCodeClaims.Select(x => x.GiftCode).ToList();
            if (claimedGiftCodes == null)
            {
                var gift = _appDBContext.GiftCodes.FirstOrDefault();
                return gift;
            }
            else
            {
                var notClaimedGiftCode = _appDBContext.GiftCodes.Where(x => !claimedGiftCodes.Contains(x.Code)).ToList();
                return notClaimedGiftCode.FirstOrDefault();
            }
            
        }
        public void UpdateClaimedGifts(string OrderNo, string GiftCode, string Name, string Email)
        {
            GiftCodeClaim claim = new GiftCodeClaim();
            claim.OrderNo = OrderNo;
            claim.GiftCode = GiftCode;
            claim.ClaimedDate = DateTime.Now.ToString();
            claim.Name = Name;
            claim.Email = Email;
            if (!IsFreeGiftClaimed(OrderNo))
            {
                _appDBContext.Add(claim);
                _appDBContext.SaveChanges();
            }
        }
        public bool SendGiftCodes(string Email, string Name, string GiftCode)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_appSettingModel.Smtp.SenderName, _appSettingModel.Smtp.SenderEmail));
                message.To.Add(new MailboxAddress(Name, Email));
                message.Subject = "Shopnutravia Free Gift";
                string emailBody = $"Hi there {Name}, <br><br>";
                //emailBody = emailBody + $"Thank you for sharing your feedback with others. Your claim has been approved. To view your gift please click <a href='https://starbucks.cashstar.com/gift-card/view/{GiftCode}' target='_blank'>here</a> or visit: https://starbucks.cashstar.com/gift-card/view/{GiftCode} <br><br>";
                emailBody = emailBody + $"Thank you for sharing your feedback with others. Your claim has been approved. To view your gift please click <a href='{GiftCode}' target='_blank'>here</a> or visit: {GiftCode} <br><br>";
                emailBody = emailBody + $"Kind regards.";
                message.Body = new TextPart("html")
                {
                    
                    Text = emailBody
                };

                using (var client = new SmtpClient())
                {
                    client.Connect(_appSettingModel.Smtp.Server, _appSettingModel.Smtp.Port, _appSettingModel.Smtp.SSL);

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(_appSettingModel.Smtp.Username, _appSettingModel.Smtp.Password);

                    client.Send(message);
                    client.Disconnect(true);
                }
                return true;
            }
            catch (Exception ex)
            {
                // Exception Details
                return false;
            }
        }
    }
}
