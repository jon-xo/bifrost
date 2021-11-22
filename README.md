# ❄ bifröst - Community Comic Book Manager
## About

Bifröst is a single-page comic book management application that combines new comic book discovery with an integrated social, user-sharing platform. Inspired by the community-based reading application Goodreads, bifröst allows users to curate a personal reading or pull-list of comics and share these selections in a continuous public timeline.

Bifröst is composed of a React frontend—styled with [React Bulma Components](https://github.com/couds/react-bulma-components) and [FontAwesome icons](https://www.npmjs.com/package/@fortawesome/react-fontawesome), and a backend composed of an [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0) API with a Microsoft SQL Server database. Additionally, Bifröst uses Google Firebase for user authentication.

## Getting Started

### Online Demo

Bifröst is available online at https://bifrost.jonxo.dev. A Virtual Private Server running Ubuntu 20.04 and Docker 20.10 hosts the live application. Each main app component (frontend<sup id="a1">*(#f1)</sup>, API, and database) is available in a Docker container, served via a [NGINX reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/), and secured using a [Let's Encrypt SSL certificate](https://certbot.eff.org/).

To view sample user data, login following credentials:
```md
- email:    admin@example.com
- password: admin-test-201
```
Or select **Register** from the top-right corner of the application menu to create a new account.

<b id="f1">__*__</b> The application frontend relies on an express server middleware to make multiple API requests, additional information is available in a related [Github repo](https://github.com/jon-xo/bifrost-proxy).

### Local Installation

## Usage

**List of site sections**

- Home
- Releases
    - Previous Comics
    - Current Comics
    - Upcoming Comics
- Reading List
- Activty
- Follows
- Settings



... **[WIP]** ...