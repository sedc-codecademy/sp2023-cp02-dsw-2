using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs;
using CoffeeHouse_App.Mappers;
using CoffeeHouse_App.Services.Abstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CoffeeHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IAddressService _addressService;

        public UserController(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IConfiguration configuration,
            IAddressService addressService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _addressService = addressService;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateUser(CreateUserModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, "User already exists!");

            var user = UserMapper.ToUser(model);
            var result = await _userManager.CreateAsync(user, model.Password);
            var role = Domain.Enums.Role.Customer.ToString();
            await _userManager.AddToRoleAsync(user, role);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "User creation failed! Please check user details and try again.");
            }

            return Ok();//(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    authClaims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    loggedUser = UserMapper.ToUserModel(user),
                });
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        [Route("Get")]
        public async Task<IActionResult> GetLoggedUser()
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await _userManager.FindByIdAsync(userId);
                return Ok(new
                {
                    user = UserMapper.ToUserModel(user)
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfileUpdateModel model)
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var allUserAddresses = _addressService.GetAllUserAddress();
                var userAddresses = allUserAddresses?.Result?.Where(x => x.UserId == userId).ToList();
                if (userAddresses is null || userAddresses.Count == 0)
                {
                    var address = UserMapper.ToAddress(model.Address, user);
                    await _addressService.CreateNewAddress(address);
                }
                else
                {
                    //TODO
                    var address = UserMapper.ToChangesAddress(model.Address);
                    //await _addressService.UpdateAddress(address);
                }

                var changedUser = UserMapper.ToUpdatedUser(user, model);

                
                var result = await _userManager.UpdateAsync(changedUser);

                return Ok("Profile updated successfully");
  
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("UpdateAccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] UserProfileUpdateModel model)
        {
            //TODO
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}
