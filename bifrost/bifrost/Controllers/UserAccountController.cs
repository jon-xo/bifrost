using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using bifrost.Models;
using bifrost.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bifrost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly IUserAccountRepository _userAccountRepository;
        public UserAccountController(IUserAccountRepository userAccountRepository)
        {
            _userAccountRepository = userAccountRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userAccountRepository.GetByFirebaseUserId(firebaseUserId));
        }



        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(UserAccount userAccount)
        {
            userAccount.CreateDateTime = DateTime.Now;
            _userAccountRepository.Add(userAccount);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userAccount.FirebaseUserId },
                userAccount);
        }

    }
}
