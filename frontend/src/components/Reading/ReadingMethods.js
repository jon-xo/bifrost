import { currentDate, getUserDetail, ReleaseComicImage, ReadingComicDate } from "../UtilityMethods";

export const addReadingContent = ( comicObject, loginState, addMethod, loadStateFunction ) => {
    
    let userId = getUserDetail();
    
    const savedContent = {
        UserId: userId,
        CVApiKey: undefined,
        PBApiKey: undefined,
        Title: undefined,
        ComicImage: undefined,
        ComicType: undefined,
        Creators: undefined,
        Publisher: undefined,
        Description: comicObject.description,
        altDescription: undefined,
        PublishDate: undefined,
        Read: false,
        LastUpdated: currentDate,
        SeriesId: undefined,
        Rating: undefined
    };

    if (comicObject.diamond_id){
        // debugger
        savedContent.PBApiKey = comicObject.diamond_id;
        savedContent.Title = comicObject.title;
        savedContent.ComicImage = ReleaseComicImage(comicObject.diamond_id);
        savedContent.ComicType = "issue";
        savedContent.Creators = comicObject.creators;
        savedContent.Publisher = comicObject.publisher;
        savedContent.PublishDate = ReadingComicDate(comicObject.release_date);
    } else if (comicObject.resource_type === "issue") {
        savedContent.CVApiKey = comicObject.id;
        if (comicObject.name){
            // debugger
            savedContent.Title = comicObject.name;
        } else {
            // debugger
            savedContent.Title = comicObject.volume.name;
        }
        savedContent.PublishDate = ReadingComicDate(comicObject?.cover_date);
        savedContent.SeriesId = comicObject.volume?.id;
        savedContent.ComicImage = comicObject?.image?.super_url;
        savedContent.ComicType = comicObject.resource_type;
    } else if (comicObject.resource_type === "volume") {
        savedContent.CVApiKey = comicObject.id;
        savedContent.Title = comicObject.name;
        savedContent.Publisher = comicObject?.publisher?.name;
        savedContent.PublishDate = ReadingComicDate(comicObject?.start_year);
        savedContent.ComicImage = comicObject?.image?.super_url;
        savedContent.SeriesId = comicObject?.first_issue.id
        savedContent.ComicType = comicObject.resource_type;
        savedContent.altDescription = `${comicObject.count_of_issues}`;   
    } 

    if(loginState) {
        addMethod(savedContent)
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => {
            loadStateFunction(false);
        })
    }
};