using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using AutoMapper;
using JwtAngularScaffold.Contracts;
using JwtAngularScaffold.Models.Dtos;
using JwtAngularScaffold.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtAngularScaffold.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/departments")]
    public class DepartmentController : Controller
    {
        private readonly IDepartmentRepository _repo;
        private readonly IMapper _mapper;

        public DepartmentController(IDepartmentRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet] // GET: api/departments
        public IActionResult GetAllDepartments()
        {
            var departments = _repo.GetAll();
            var departmentsToReturn = _mapper.Map<IEnumerable<DepartmentDto>>(departments);
            return Ok(departmentsToReturn);
        }

        [HttpGet("{id}")] // GET: api/departments/1
        public IActionResult GetDepartmnet([FromRoute] int id)
        {
            var department = _repo.GetById(id);
            var departmentToReturn = _mapper.Map<DepartmentDto>(department);
            return Ok(departmentToReturn);
        }

        [HttpPost] // GET: api/departments
        public async Task<IActionResult> CreateDepartment([FromBody] Department department)
        {
            await _repo.CreateAsync(department);
            return Ok();
        }

        [HttpPut("{id}")] // PUT: api/departments/1
        public async Task<IActionResult> UpdateDepartment([FromRoute] int id, [FromBody] Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repo.UpdateAsync(department);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_repo.Exists(id))
                {
                    return NotFound();
                }

                throw;
            }
            
            return NoContent();
        }

        [HttpDelete] // DELETE: api/departments/1
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
           await _repo.DeleteAsync(id);
           return Ok();
        }
    }
}