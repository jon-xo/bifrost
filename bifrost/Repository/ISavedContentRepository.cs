using bifrost.Models;
using System.Collections.Generic;

namespace bifrost.Repository
{
    public interface ISavedContentRepository
    {
        SavedContent Add(SavedContent content);
        void Delete(int id);
        List<SavedContent> GetAllPublicContent();
        List<SavedContent> GetUserReadStatusContent(int activeUserId, bool readStatus);
        List<SavedContent> GetUserSavedContent(int activeUserId);
        void UpdateReadStatus(int id, bool readStatus);
    }
}