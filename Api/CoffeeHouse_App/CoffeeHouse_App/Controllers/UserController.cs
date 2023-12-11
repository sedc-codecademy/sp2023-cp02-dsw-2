using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs;
using CoffeeHouse_App.Mappers;
using CoffeeHouse_App.Mappers.UserMappers;
using CoffeeHouse_App.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;


namespace CoffeeHouse_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IAddressService _addressService;
        private readonly IEmailService _emailService;
        private readonly IUserAddressService _userAddressService;

        public UserController(
            UserManager<User> userManager,
            IConfiguration configuration,
            IAddressService addressService,
            IEmailService emailService,
            IUserAddressService userAddressService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _addressService = addressService;
            _emailService = emailService;
            _userAddressService = userAddressService;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateUser(CreateUserModel model)
        {
            try
            {
                // Check User exist
                var userExists = await _userManager.FindByNameAsync(model.Email);
                if (userExists != null)
                    return BadRequest(new { ErrorMessage = "User already exists!" });

                // Add the User to the Database
                var user = UserMapper.ToUser(model);
                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    var errorMessages = result.Errors.Select(error => error.Description).ToList();
                    return BadRequest(new { Errors = errorMessages });
                }

                var role = Domain.Enums.Role.Customer.ToString();
                await _userManager.AddToRoleAsync(user, role);

                // Add Token to verify the email
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var encodedToken = HttpUtility.UrlEncode(token);

                var confirmationLink = Url.Action("ConfirmEmail", "User", new { token = encodedToken, email = user.Email }, Request.Scheme);

                var message = new Message(new string[] { user.Email! }, "Confirm Your Account", confirmationLink);

                _emailService.SendEmail(message);

                return !result.Succeeded
                    ? BadRequest(new { ErrorMessage = "User creation failed! Please check user details and try again." })
                    : (IActionResult)StatusCode(StatusCodes.Status201Created, $"User created successfully and Email send to {user.Email} successfully.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var codeHtmlDecoded = HttpUtility.UrlDecode(token);

            var user = await _userManager.FindByNameAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, codeHtmlDecoded);
                if (result.Succeeded)
                {
                    return Redirect("http://127.0.0.1:5502/pages/login-signup/login.html");
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "This user does not exist.");
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { ErrorMessage = "User doesn't exists!" });
            }
            
            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                if (user.EmailConfirmed == false)
                {
                    return BadRequest(new { ErrorMessage = "Your account is not confirmed." });
                }

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

                Photo photo = null;
                if (user.PhotoId != null)
                {
                    photo = await _userAddressService.GetPhotoById((int)user.PhotoId);
                }

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    loggedUser = UserMapper.ToUserModel(user, photo),
                });
            }
            return BadRequest(new { ErrorMessage = "Invalid email or password for user." }); 
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.FindByNameAsync(email);

            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var encodedToken = HttpUtility.UrlEncode(token);
                var forgotPasswordLink = Url.Action("ResetPassword", "User", new { token = encodedToken, email = user.Email }, Request.Scheme);
                var message = new Message(new string[] { user.Email! }, "Reset Your Password", forgotPasswordLink!);

                _emailService.SendForgotPassEmail(message);

                return StatusCode(StatusCodes.Status200OK, $"Password Changed request is send on {user.Email}");
            }
            return BadRequest(new { ErrorMessage = "User doesn't exists!" });
        }


        [HttpGet]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string token, string email)
        {
            var codeHtmlDecoded = HttpUtility.UrlDecode(token);

            var user = await _userManager.FindByNameAsync(email);
            if (user != null)
            {
                var purpose = UserManager<User>.ResetPasswordTokenPurpose;
                var isTokenValid = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultProvider, purpose, codeHtmlDecoded);
                if (isTokenValid)
                {
                    var encodedToken = HttpUtility.UrlEncode(codeHtmlDecoded);
                    return Redirect($"http://127.0.0.1:5502/pages/login-signup/reset-password.html?token={encodedToken}&email={email}");
                }
                return BadRequest(new { ErrorMessage = "Invalid token: token contains an invalid number of segments" });
            }
            return BadRequest(new { ErrorMessage = "User doesn't exists!" });
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ForgotPasswordModel resetPassword)
        {

            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user == null)
                return BadRequest(new { ErrorMessage = "User doesn't exists!" });

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (!resetPassResult.Succeeded)
            {
                var errorMessages = resetPassResult.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Errors = errorMessages });
            }

            return StatusCode(StatusCodes.Status200OK, "Your password has been changed successfully.");
        }

        [Authorize]
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return BadRequest(new { ErrorMessage = "User doesn't exists!" });
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (changePasswordResult.Succeeded)
            {
                return Ok("Password changed successfully!");
            }
            else
            {
                return BadRequest(new { ErrorMessage = "Failed to change password" });
            }
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
                Photo photo = null;
                if(user.PhotoId != null)
                {
                    photo = await _userAddressService.GetPhotoById((int)user.PhotoId);
                }
                
                return Ok(new
                {
                    user = UserMapper.ToUserModel(user, photo)
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
        public async Task<IActionResult> UpdateProfile(UserProfileUpdateModel model)
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var allUserAddresses = _userAddressService.GetAllUserAddress();
                var userAddresses = allUserAddresses?.Result?.Where(x => x.UserId == userId).ToList();
                var isCreatedNewAddress = (userAddresses is null || userAddresses.Count == 0) && model.Address != null;
                var isChangedAddress = (userAddresses != null || userAddresses.Count != 0) && model.Address != null;
                if (isCreatedNewAddress)
                {
                    var address = UserMapper.ToAddress(model.Address, user);
                    await _userAddressService.CreateNewUserAddress(address);
                }
                else if (isChangedAddress)
                {
                    var addressId = userAddresses.FirstOrDefault().AddressId;
                    var userAddress = await _addressService.GetAddressById(addressId);
                    ObjectMapper.MapChanges(model.Address, userAddress);
                    await _addressService.UpdateAddress(userAddress);
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
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return NotFound($"User with Email {user.Email} not found.");
                }

                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return Ok("Profile deactivated successfully!");
                }

                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Errors = errorMessages });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage(UserImage userImage)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return NotFound($"User with Email {user.Email} not found.");
                }

                string base64Data = ExtractBase64FromDataUri(userImage.Base64Image);
                byte[] imageBytes = Convert.FromBase64String(base64Data);
                user.Photo = new Photo
                {
                    Bytes = imageBytes,
                    Description = $"profile_picture{user.Id}.jpg",
                    FileExtension = ".jpg",
                    Size = imageBytes.Length

                };

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                   return Ok(new
                {
                       base64 = user.Photo?.Bytes == null ? string.Empty : "data:image/jpeg;base64," + Convert.ToBase64String(user.Photo.Bytes)
                   });
                }

                var errorMessages = result.Errors.Select(error => error.Description).ToList();
                return BadRequest(new { Errors = errorMessages });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        static string ExtractBase64FromDataUri(string dataUri)
        {
            Regex regex = new Regex(@"data:[^;]+;base64,(?<data>[^""]+)");
            Match match = regex.Match(dataUri);

            if (match.Success)
            {
                return match.Groups["data"].Value;
            }

            return string.Empty;
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
