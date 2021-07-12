using bifrost.Models;
using System.Collections.Generic;

namespace bifrost.Repository
{
    public interface IUserAccountRepository
    {
        void Add(UserAccount userAccount);
        void AddFollow(int leader, int follower);
        UserAccount GetByFirebaseUserId(string firebaseUserId);
        List<UserAccount> GetFollows(int leader, bool followBack);
    }
}