namespace API.DTOs
{
  public class BasktetItemDto
  {
    public int ProductId { get; set; }
    public string Name { get; set; }

    public long Price { get; set; }
    public string pictureUrl { get; set; }

    public string Brand { get; set; }

    public string Type { get; set; }

    public int Quantity { get; set; }
  }
}