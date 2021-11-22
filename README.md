# ❄ bifröst - Community Comic Book Manager
## About

Bifröst is a single-page comic book management application that combines new comic book discovery with an integrated social, user-sharing platform. Inspired by the community-based reading application Goodreads, bifröst allows users to curate a personal reading or pull-list of comics and share these selections in a continuous public timeline.

Bifröst is composed of a React frontend—styled with [React Bulma Components](https://github.com/couds/react-bulma-components) and [FontAwesome icons](https://www.npmjs.com/package/@fortawesome/react-fontawesome), and a backend composed of an [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0) API with a Microsoft SQL Server database. Additionally, Bifröst uses Google Firebase for user authentication.

## Getting Started

### Online Demo

Bifröst is available online at https://bifrost.jonxo.dev. A Virtual Private Server running Ubuntu 20.04 and Docker 20.10 hosts the live application. Each main app component (frontend<sup>[★](#f1)</sup>, API, and database) is available in a Docker container, served via a [NGINX reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/), and secured using a [Let's Encrypt SSL certificate](https://certbot.eff.org/).

To view sample user data, login following credentials:
```md
- email:    admin@example.com
- password: admin-test-201
```
Or select **Register** from the top-right corner of the application menu to create a new account.

<b id="f1">__★__</b> The application frontend relies on an express server middleware to make multiple API requests, additional information is available in a related [Github repo](https://github.com/jon-xo/bifrost-proxy).

### Local Installation

1.  Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    - If Node.js and npm are already installed, use `node -v && npm -v` to check the version and verify that both versions are `v10.24.1` & `6.14.13` or greater.
    - If the version is older than the minimum requirement, update to the latest stable version of [node](https://docs.npmjs.com/try-the-latest-stable-version-of-node) & [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
2. Use [https or SSH](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line) to clone the project folder to a local directory:
    ```Bash
    $ git clone ...
    ```
3. From the cloned project directory:
    ```Bash
    $ npm install
    ```
4. Install [.NET Core](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro)
5. Create a new [Google Firebase Project](https://firebase.google.com/docs/functions/get-started#create-a-firebase-project)
6. In your Firebase project, enable Email/Password sign-in:
   1. In the Firebase console, open the Auth section
   2. On the **Sign in method** tab, enable the **Email/password sign-in** method and click **Save**
7. While signed into Google Firebase, locate and copy the [Firebase project ID and the Web API key](https://console.firebase.google.com/project/_/settings/general/).
8. Create two new files and add the following content:
   1. In the project frontend directory(`./frontend`), create a `.env.local` file and add the following:
        (*Replace '**YOUR_FIREBASE_PROJECT_API**' with the value copied in the previous step*)
        ```
        REACT_APP_API_KEY=YOUR_FIREBASE_PROJECT_API
        ```
   2. In the API directory (`./bifrost`), create a `appsettings.local.json` file and add the following:
        (*Replace '**YOUR_FIREBASE_PROJECT_ID**' with the value copied in the previous step*)
        ```json
        {
            "FirebaseProjectId": "YOUR_FIREBASE_PROJECT_ID"
        }
        ```
9. Install [SQL Server Express LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15) and configure the following:
   1. Install Visual Studio 2019
   2. At the start screen select **Continue without code**.
   3. Open the **View** menu and select **SQL Server Object Explorer**.
   4. **Right-click** the SQL Server node, select 
   5. In the dialog that appears, expand the **Local** node and select the SQL Server instance called **SQLEXPRESS**
   6. Click **connect**
10. In the Visual Studio Code SQL Server Object Explorer, right click the **SQLEXPRESS** server and select **New Query...** from the context menu.
11. Copy the contents of the `01_Bifrost_Create_DB.sql` script in `SQL` directory and paste into the new query tab and click the Execute button (*Control+Shift+E*).
12. Repeat the process for the second SQL script `02_Bifrost_BuildData.sql`.
13. Start the application:
    1.  Launch Visual Studio 2019 and open the project solution file: `bifrost.sln`
    2.  Click the project debug start button (*F5*)
    3.  From the command line, navigate to the frontend directory and run `npm start`

## Usage

**List of site sections**

- Home
- Releases
    - Previous Comics
    - Current Comics
    - Upcoming Comics
- Reading List
- Activity
- Follows
- Settings



... **[WIP]** ...