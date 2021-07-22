using System;
using Microsoft.Extensions.Configuration;
using bifrost.Models;
using bifrost.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

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

        public UserAccount UpdateUser(UserAccount userAccount)
        {

            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Update UserAccount
                        SET
                            [Name] = @name, 
                            DisplayName = @displayName, 
                            UserSummary = @userSummary, 
                            ImageLocation = @imageLocation, 
                            [Private] = @private
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@name", userAccount.Name);
                    cmd.Parameters.AddWithValue("@displayName", userAccount.DisplayName);
                    cmd.Parameters.AddWithValue("@imageLocation", userAccount.ImageLocation);
                    cmd.Parameters.AddWithValue("@prviate", userAccount.Private);
                    cmd.Parameters.AddWithValue("@id", userAccount.Id);

                    cmd.ExecuteNonQuery();
                }
            }

            return userAccount;
        }

        public void AddFollow(int leader, int follower)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Follows (
                                                UserId, 
                                                FollowId)
                                         VALUES (
                                                @UserId, 
                                                @FollowId)";

                    DbUtils.AddParameter(cmd, "@UserId", leader);
                    DbUtils.AddParameter(cmd, "@FollowId", follower);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserAccount> GetFollows(int leader, bool followBack)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    var sqlQuery =
                        @"
                        SELECT  fw.UserId AS LeaderId,
                                fw.FollowId AS FollowerId,
                                u.Id AS FollowerUserId,
                                u.Firebase_Id AS FollowerFirebaseId, 
                                u.[Name] AS FollowerName,
                                u.DisplayName AS FollowerDisplayName,
                                u.Email AS FollowerEmail,
                                u.CreateDateTime AS FollowerUserCreated,
                                u.ImageLocation AS FollowerAvatar,
                                u.UserSummary AS FollowerSummary,
                                u.[Private] AS isPrivate
                        FROM Follows fw";

                    if (followBack)
                    {
                        sqlQuery += @" LEFT JOIN UserAccount u on fw.UserId = u.Id
                                    WHERE fw.UserId = @leader AND u.[Private] = 0
                                    ORDER BY u.DisplayName";
                    }
                    else
                    {
                        sqlQuery += @" LEFT JOIN UserAccount u on fw.FollowId = u.Id
                                    WHERE fw.UserId = @leader AND u.[Private] = 0
                                    ORDER BY u.DisplayName";
                    }

                    //sqlQuery += "WHERE UserId = @leader AND u.[Private] = 0  ORDER BY u.DisplayName";

                    cmd.CommandText = sqlQuery;

                    DbUtils.AddParameter(cmd, "@leader", leader);

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<UserAccount> followers = new List<UserAccount>();

                    while (reader.Read())
                    {
                        followers.Add(new UserAccount()
                        {
                            Id = DbUtils.GetInt(reader, "FollowerUserId"),
                            Name = DbUtils.GetString(reader, "FollowerName"),
                            DisplayName = DbUtils.GetString(reader, "FollowerDisplayName"),
                            Email = DbUtils.GetString(reader, "FollowerEmail"),
                            ImageLocation = DbUtils.GetString(reader, "FollowerAvatar"),
                            Private = DbUtils.GetBoolean(reader, "isPrivate")
                        });
                    }
                    reader.Close();
                    return followers;
                }
            }
        }

        public void DeleteFollow(int leader, int follower)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Follows 
                                        WHERE UserId = @UserId AND FollowId = @FollowId";

                    DbUtils.AddParameter(cmd, "@UserId", leader);
                    DbUtils.AddParameter(cmd, "@FollowId", follower);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
