namespace API.RequestHelpers
{
    public class ProductParamas : PaginationParams
    {
        public string OrderBy { get; set; }
        public string searchTerm { get; set; }
        public string Types { get; set; }
        public string Brands { get; set; }
    }
}