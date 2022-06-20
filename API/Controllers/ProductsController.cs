using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts([FromQuery]ProductParamas productParamas)
    {
      // return await  _context.Products.ToListAsync();
      var query = _context.Products
        .Sort(productParamas.OrderBy)
        .Search(productParamas.searchTerm)
        .Filter(productParamas.Brands,productParamas.Types)
        .AsQueryable();

      var products = await PagedList<Product>.ToPagedList(query,productParamas.PageNumber,productParamas.PageSize);

      // Response.Headers.Add("Pagination",JsonSerializer.Serialize(products.MetaData));
      Response.AddPaginationHeader(products.MetaData);
      // return await query.ToListAsync();
      return products;
    }

    [HttpGet("{id}")] // api/products/3
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await  _context.Products.FindAsync(id);

      if( product ==null) return NotFound();
      
      return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
      var types  = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

      return Ok(new {brands,types});
    }
  }
}