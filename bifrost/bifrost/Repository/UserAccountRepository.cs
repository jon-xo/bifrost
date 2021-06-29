using System;
using Microsoft.Extensions.Configuration;
using bifrost.Models;
using bifrost.Utils;
using Microsoft.Data.SqlClient;

namespace bifrost.Repository
{
    public class UserAccountRepository : BaseRepository, IUserAccountRepository
    {
        public UserAccountRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        ///  --- GitHub Issue Ticket # 1 ---
        ///  [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
        ///  
        ///  GetByFirebaseUserId performs SQL query with the passed firebaseUserId
        ///  and if found, builds an object using the UserAccount class
        /// </summary>
        /// <param name="firebaseUserId">Firebase UUID.</param>
        /// <returns>userAccount object.</returns>

        public UserAccount GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                               Id,
                                               Firebase_Id, 
                                               Name,
                                               DisplayName,
                                               Email,
                                               CreateDateTime,
                                               ImageLocation,
                                               UserSummary,
                                               Private
                                        FROM UserAccount
                                        WHERE Firebase_Id = @Firebase_Id";

                    DbUtils.AddParameter(cmd, "@Firebase_Id", firebaseUserId);

                    UserAccount userAccount = null;

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userAccount = new UserAccount()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "Firebase_Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserSummary = DbUtils.GetString(reader, "UserSummary"),
                            Private = DbUtils.GetBoolean(reader, "Private")
                        };
                    }

                    reader.Close();
                    return userAccount;
                }
            }
        }

        /// <summary>
        ///  --- GitHub Issue Ticket # 1 ---
        ///  [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
        ///  
        ///  Add performs SQL query with the received userAccount objec
        ///  and assigns the values to the related UserAccount table columns
        /// </summary>
        /// <param name="userAccount">Current userAccount from frontend provider</param>
        /// <returns>User ID</returns>

        public void Add(UserAccount userAccount)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserAccount (
                                                [Name], 
                                                DisplayName, 
                                                Email,
                                                Firebase_Id, 
                                                UserSummary, 
                                                CreateDateTime, 
                                                ImageLocation, 
                                                [Private])
                                         OUTPUT INSERTED.ID
                                         VALUES ( 
                                                @Name, 
                                                @DisplayName, 
                                                @Email,
                                                @Firebase_Id, 
                                                @UserSummary, 
                                                @CreateDateTime, 
                                                @ImageLocation, 
                                                @Private)";

                    DbUtils.AddParameter(cmd, "@Firebase_Id", userAccount.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userAccount.Name);
                    DbUtils.AddParameter(cmd, "@DisplayName", userAccount.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userAccount.Email);
                    DbUtils.AddParameter(cmd, "@UserSummary", userAccount.UserSummary);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userAccount.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userAccount.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Private", userAccount.Private);

                    userAccount.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
