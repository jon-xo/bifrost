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
