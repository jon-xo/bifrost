USE [master]

IF db_id('bifrost') IS NULL
    CREATE DATABASE [bifrost]
GO

USE [bifrost]
GO

DROP TABLE IF EXISTS [Follows];
DROP TABLE IF EXISTS [Comments];
DROP TABLE IF EXISTS [SavedContent];
DROP TABLE IF EXISTS [UserAccount];
GO

CREATE TABLE [UserAccount] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(64),
  [DisplayName] nvarchar(32),
  [Email] nvarchar(255),
  [Firebase_Id] nvarchar(28),
  [UserSummary] nvarchar(280),
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar,
  [Private] bit
)


CREATE TABLE [SavedContent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [CVApiKey] nvarchar(15),
  [PBApiKey] nvarchar(15),
  [Title] nvarchar(255) NOT NULL,
  [Publisher] nvarchar(255),
  [Creators] nvarchar(255),
  [Description] text,
  [ComicImage] nvarchar(255),
  [PublishDate] datetime,
  [Read] bit,
  [LastUpdated] datetime,
  [SeriesId] nvarchar(255),
  [Rating] int,
  [ComicType] nvarchar(10) NOT NULL

  CONSTRAINT [FK_SavedContent_UId_User] FOREIGN KEY ([UserId]) REFERENCES [UserAccount] ([Id])
)


CREATE TABLE [Comments] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SavedContentId] int,
  [Text] nvarchar(max),
  [UserId] int,
  [date] datetime,
  [draft] bit,

  CONSTRAINT [FK_Comment_SavedContent] FOREIGN KEY ([SavedContentId]) REFERENCES [SavedContent] ([Id]),
  CONSTRAINT [FK_Comment_User] FOREIGN KEY ([UserId]) REFERENCES [UserAccount] ([Id])
)


CREATE TABLE [Follows] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [FollowId] int,

  CONSTRAINT [FK_Follow_FollowHost] FOREIGN KEY ([UserId]) REFERENCES [UserAccount] ([Id]),
  CONSTRAINT [FK_Follow_Client] FOREIGN KEY ([FollowId]) REFERENCES [UserAccount] ([Id])
)
GO

--ALTER TABLE [SavedContent] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
--GO

--ALTER TABLE [Follows] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
--GO

--ALTER TABLE [Follows] ADD FOREIGN KEY ([FollowId]) REFERENCES [User] ([Id])
--GO

--ALTER TABLE [Comments] ADD FOREIGN KEY ([SavedContentId]) REFERENCES [SavedContent] ([Id])
--GO

--ALTER TABLE [Comments] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
--GO