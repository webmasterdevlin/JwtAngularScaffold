using AutoMapper;
using JwtAngularScaffold.Contracts;
using JwtAngularScaffold.Helpers;
using JwtAngularScaffold.Models.Dtos;
using JwtAngularScaffold.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace JwtAngularScaffold.Controllers
{
    [Route("api/register")]
    public class RegisterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;

        public RegisterController(IMapper mapper, IUserRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
        [HttpPost]
        [Route("signup")]
        public IActionResult Signup([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try
            {
                // save 
                _repo.Create(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}