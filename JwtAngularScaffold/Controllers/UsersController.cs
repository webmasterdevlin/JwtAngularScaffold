using System.Collections.Generic;
using AutoMapper;
using JwtAngularScaffold.Contracts;
using JwtAngularScaffold.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace JwtAngularScaffold.Controllers
{
    [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _repo.GetAll();
            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(usersToReturn);
        }
    }
}