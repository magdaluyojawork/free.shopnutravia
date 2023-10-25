namespace shopnutravia.Models
{
    public class AppSettingModel
    {
        public ConnectionStrings ConnectionStrings { get; set; }
        public Smtp Smtp { get; set; }
    }

    public class ConnectionStrings
    {
        public string ShopnutraviaDBContext { get; set; }
    }

    public class Smtp
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool SSL { get; set; }
    }

}
