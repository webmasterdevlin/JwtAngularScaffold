using AutoMapper;
using JwtAngularScaffold.Models.Dtos;
using JwtAngularScaffold.Models.Entities;

namespace JwtAngularScaffold.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}