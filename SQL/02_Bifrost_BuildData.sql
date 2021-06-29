USE [bifrost];
GO

set identity_insert [UserAccount] on
    insert into [UserAccount] (Id, [Name], DisplayName, Email, Firebase_Id, UserSummary, CreateDateTime, ImageLocation, [Private]) values (1, 'Test Admin', 'rougeOneX' , 'admin@example.com', '4tU6x2KaBJfPjn7GoS4siYMiPl82', 'Even test users love comics!', '2021-06-25', null, 0);
    insert into [UserAccount] (Id, [Name], DisplayName, Email, Firebase_Id, UserSummary, CreateDateTime, ImageLocation, [Private]) values (2, 'Test User', 'Tardis-01' , 'user@example.com', 'f9MpXSBHzhcJLAETE6C2866cx9p1', 'Comics are bigger on the inside', '2021-06-28', null, 0);
set identity_insert [UserAccount] off