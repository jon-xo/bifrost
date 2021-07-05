using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using bifrost.Models;
using bifrost.Repository;
using System;
using System.Collections.Generic;

namespace bifrost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SavedContentController : ControllerBase
    {
        private readonly ISavedContentRepository _savedContentRepository;

        public SavedContentController(ISavedContentRepository savedContentRepository)
        {
            _savedContentRepository = savedContentRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            return Ok(_savedContentRepository);
        }

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(SavedContent content)
        {
            _savedContentRepository.Add(content);
            return Ok(content);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
