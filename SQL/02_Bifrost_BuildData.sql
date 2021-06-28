USE [bifrost];
GO

set identity_insert [UserAccount] on
    insert into [UserAccount] (Id, Name, Email, Firebase_Id, UserSummary, CreateDateTime, ImageLocation, Private) values (1, 'Test Admin', 'admin@example.com', '4tU6x2KaBJfPjn7GoS4siYMiPl82', 'Even test users love comics!', '2021-06-25', null, 0);
set identity_insert [UserAccount] off