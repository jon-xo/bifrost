using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using bifrost.Models;
using bifrost.Utils;
using Microsoft.Data.SqlClient;

namespace bifrost.Repository
{
    public class SavedContentRepository : BaseRepository, ISavedContentRepository
    {
        public SavedContentRepository(IConfiguration configuration) : base(configuration) { }

        public List<SavedContent> GetUserSavedContent(int activeUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  sc.Id AS SavedContentId,
                                sc.UserId AS UserAccountId,
                                u.Name AS UserAccountName,
                                u.DisplayName AS UserAccountDisplayName,
                                u.Email AS UserAccountEmail,
                                u.ImageLocation AS UserAccountImage,
                                u.Email AS UserAccountEmail,
                                u.Private AS UserAccountPrivate,
                                sc.CVApiKey,
                                sc.PBApiKey,
                                sc.Title,
                                sc.Publisher
                                sc.Creators,
                                sc.Description,
                                sc.ComicImage,
                                sc.PublishDate,
                                sc.Read,
                                sc.LastUpdated,
                                sc.SeriesId,
                                sc.Rating,
                                sc.ComicType
                        FROM SavedContent sc
                            LEFT JOIN UserAccount u ON sc.UserId = u.Id
                        WHERE UserAccountId = @activeUserId
                        ORDER BY sc.LastUpdated
                    ";

                    DbUtils.AddParameter(cmd, "@activeUserId", activeUserId);

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<SavedContent> savedContents = new List<SavedContent>();
                    while (reader.Read())
                    {
                        savedContents.Add(new SavedContent()
                        {
                            Id = DbUtils.GetInt(reader, "SavedContentId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            CVApiKey = DbUtils.GetString(reader, "CVApiKey"),
                            PBApiKey = DbUtils.GetString(reader, "PBApiKey"),
                            Publisher = DbUtils.GetString(reader, "Publisher"),
                            Creators = DbUtils.GetString(reader, "Creators"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ComicImage = DbUtils.GetString(reader, "ComicImage"),
                            PublishDate = DbUtils.GetNullableDateTime(reader, "PublishDate"),
                            Read = DbUtils.GetBoolean(reader, "Read"),
                            LastUpdated = DbUtils.GetNullableDateTime(reader, "LastUpdated"),
                            SeriesId = DbUtils.GetString(reader, "SeriesId"),
                            Rating = DbUtils.GetNullableInt(reader, "Rating"),
                            ComicType = DbUtils.GetString(reader, "ComicType"),
                            UserAccountId = DbUtils.GetInt(reader, "UserAccountId"),
                            UserAccount = new UserAccount()
                            {
                                Id = DbUtils.GetInt(reader, "UserAccountId"),
                                Name = DbUtils.GetString(reader, "UserAccountName"),
                                DisplayName = DbUtils.GetString(reader, "UserAccountDisplayName"),
                                Email = DbUtils.GetString(reader, "UserAccountEmail"),
                                ImageLocation = DbUtils.GetString(reader, "UserAccountImage"),
                                Private = DbUtils.GetBoolean(reader, "UserAccountPrivate")
                            }
                        });
                    }
                    reader.Close();
                    return savedContents;
                }
            }
        }

        public SavedContent Add(SavedContent content)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO SavedContent (
                            UserId,
                            CVApiKey,
                            PBApiKey,
                            Title,
                            Publisher
                            Creators,
                            Description,
                            ComicImage,
                            ComicType,
                            PublishDate,
                            Read,
                            LastUpdated,
                            SeriesId,
                            Rating)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @UserId,                           
                            @CVApiKey,
                            @PBApiKey,
                            @Title,
                            @Publisher
                            @Creators,
                            @Description,
                            @ComicImage,
                            @ComicType,
                            @PublishDate,
                            @Read,
                            @LastUpdated,
                            @SeriesId,
                            @Rating)";

                    DbUtils.AddParameter(cmd, "@UserId", content.UserId);
                    DbUtils.AddParameter(cmd, "@CVApiKey", content.CVApiKey);
                    DbUtils.AddParameter(cmd, "@PBApiKey", content.PBApiKey);
                    DbUtils.AddParameter(cmd, "@Title", content.Title);
                    DbUtils.AddParameter(cmd, "@Publisher", content.Publisher);
                    DbUtils.AddParameter(cmd, "@Creators", content.Creators);
                    DbUtils.AddParameter(cmd, "@Description", content.Description);
                    DbUtils.AddParameter(cmd, "@ComicImage", content.ComicImage);
                    DbUtils.AddParameter(cmd, "@ComicType", content.ComicType);
                    DbUtils.AddParameter(cmd, "@PublishDate", content.PublishDate);
                    DbUtils.AddParameter(cmd, "@Read", content.Read);
                    DbUtils.AddParameter(cmd, "@LastUpdated", content.LastUpdated);
                    DbUtils.AddParameter(cmd, "@SeriesId", content.SeriesId);
                    DbUtils.AddParameter(cmd, "@Rating", content.Rating);

                    content.Id = (int)cmd.ExecuteScalar();
                }
            }

            return content;
        }
    }
}
