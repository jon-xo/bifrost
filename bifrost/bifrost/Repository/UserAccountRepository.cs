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

        public UserAccount GetByFireBaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                               Id,
                                               FirebaseUserId, 
                                               Name,
                                               DisplayName,
                                               Email,
                                               CreateDateTime,
                                               ImageLocation,
                                               UserSummary,
                                               Private
                                        FROM UserAccount
                                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserAccount userAccount = null;

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userAccount = new UserAccount()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
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

        public void Add(UserAccount userAccount)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserAccount (
                                                Id, 
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
                                                @Firebase_Id, 
                                                @Name, 
                                                @DisplayName, 
                                                @Email,
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
