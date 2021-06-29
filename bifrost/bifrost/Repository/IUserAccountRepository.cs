using bifrost.Models;

namespace bifrost.Repository
{
    public interface IUserAccountRepository
    {
        void Add(UserAccount userAccount);
        UserAccount GetByFirebaseUserId(string firebaseUserId);
    }
}