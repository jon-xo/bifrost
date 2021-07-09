using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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

        /// <summary>
        ///  --- GitHub Issue Ticket # 1 ---
        ///  [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
        ///  
        ///  GetUserProfile is called on GET method with firebaseUserId as route parameter,
        ///  method then envokes GetByFirebaseUserId from the private userAccountRepository
        ///  and returns Ok status with matching object or null
        /// </summary>

        // GET: api/<ValuesController>
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userAccountRepository.GetByFirebaseUserId(firebaseUserId));
        }

        /// <summary>
        ///  --- GitHub Issue Ticket # 1 ---
        ///  [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
        ///  
        ///  Post is called on POST method and accepts a userAccount object,
        ///  method then envokes Add from the private userAccountRepository
        ///  and returns succesfully created userAccount with firebase UUID and
        ///  database ID
        /// </summary>

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

        [HttpPost("fw")]
        public IActionResult FollowUser(int uId, int fId)
        {
            _userAccountRepository.AddFollow(uId, fId);
            return NoContent();
        }

        [HttpGet("fw")]
        public IActionResult GetFollows(int uId, bool fb)
        {
            return Ok(_userAccountRepository.GetFollows(uId, fb));             
        }

    }
}
