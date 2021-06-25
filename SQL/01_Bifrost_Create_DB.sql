USE [master]

IF db_id('bifrost') IS NULL
    CREATE DATABASE [bifrost]
GO

USE [bifrost]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [SavedContent];
DROP TABLE IF EXISTS [Comments];
DROP TABLE IF EXISTS [Follows];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [Email] nvarchar(255),
  [Firebase_Id] nvarchar(28),
  [UserSummary] nvarchar(280),
  [CreateDateTime] datetime NOT NULL,
  [Private] bit
)


CREATE TABLE [SavedContent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [CVApiKey] int,
  [PBApiKey] int,
  [Title] nvarchar(255) NOT NULL,
  [Publisher] nvarchar(255),
  [Creators] nvarchar(255),
  [Description] nvarchar(512),
  [ComicImage] nvarchar,
  [PublishDate] datetime,
  [Read] bit,
  [LastUpdated] datetime,
  [SeriesId] nvarchar(255),
  [Rating] int,

  CONSTRAINT [FK_SavedContent_UId_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)


CREATE TABLE [Comments] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SavedContentId] int,
  [Text] nvarchar(512),
  [UserId] int,
  [date] datetime,
  [draft] bit,

  CONSTRAINT [FK_Comment_SavedContent] FOREIGN KEY ([SavedContentId]) REFERENCES [SavedContent] ([Id]),
  CONSTRAINT [FK_Comment_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)


CREATE TABLE [Follows] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [FollowId] int,

  CONSTRAINT [FK_Follow_FollowHost] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_Follow_Client] FOREIGN KEY ([FollowId]) REFERENCES [User] ([Id])
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