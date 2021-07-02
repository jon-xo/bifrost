using bifrost.Models;
using System.Collections.Generic;

namespace bifrost.Repository
{
    public interface ISavedContentRepository
    {
        SavedContent Add(SavedContent content);
        List<SavedContent> GetUserSavedContent(int activeUserId);
    }
}