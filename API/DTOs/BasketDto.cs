using System.Collections.Generic;

namespace API.DTOs
{
  public class BasketDto
  {
    public int Id { get; set; }

    public string BuyerId {get; set; }

    public List<BasktetItemDto> Items {get; set; }

    public string PaymentIntentId { get; set; }

    public string ClientSecret { get; set; }
  }
}