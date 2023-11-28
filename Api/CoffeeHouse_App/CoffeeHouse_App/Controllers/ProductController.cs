using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs.ProductDtos;
using CoffeeHouse_App.Services.Abstractions;
using CoffeeHouse_App.Shared.CustomExceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CoffeeHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpPost ("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDto product)
        {
            try
            {
                var photoBytes = ReadImageFile(product.ImageFile);
                await _productService.AddProduct(product, photoBytes);
                return StatusCode(StatusCodes.Status201Created, "Product Added!");

            }
            catch (ProductDataException ex)
            {

                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAllProducts()
        {
            try
            {
                return await _productService.GetAllProducts(); 
            }
            catch (ProductDataException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            try
            {
                return await _productService.GetProductById(id);
            }
            catch (ProductDataException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("CartProducts")]
        public async Task<ActionResult<List<ProductDto>>> GetCartProducts()
        {
            
            try
            {
                string userId = "2";
                List<ProductDto> cartProducts = await _productService.GetCartProducts(userId);
                return cartProducts;
            }
            catch (ProductDataException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        private byte[] ReadImageFile(IFormFile imageFile)
        {
            using (var stream = imageFile.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
