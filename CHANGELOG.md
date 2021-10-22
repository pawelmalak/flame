### v1.7.1 (TBA)
- Fixed search action not being triggered by Numpad Enter
- Added option to change date formatting ([#92](https://github.com/pawelmalak/flame/issues/92))
- Added shortcuts (Esc and double click) to clear search bar ([#100](https://github.com/pawelmalak/flame/issues/100))
- Added Traefik integration ([#102](https://github.com/pawelmalak/flame/issues/102))
- Fixed search bar not redirecting to valid URL if it starts with capital letter ([#118](https://github.com/pawelmalak/flame/issues/118))
- Performance improvements

### v1.7.0 (2021-10-11)
- Search bar will now redirect if valid URL or IP is provided ([#67](https://github.com/pawelmalak/flame/issues/67))
- Users can now add their custom search providers ([#71](https://github.com/pawelmalak/flame/issues/71))
- Fixed bug related to creating new apps/bookmarks with custom icon ([#83](https://github.com/pawelmalak/flame/issues/83))
- URL can now be assigned to notifications. Clicking on "New version is available" popup will now redirect to changelog ([#86](https://github.com/pawelmalak/flame/issues/86))
- Added static fonts ([#94](https://github.com/pawelmalak/flame/issues/94))
- Fixed bug with overriding app icon created with docker labels

### v1.6.9 (2021-10-09)
- Added option for remote docker host ([#97](https://github.com/pawelmalak/flame/issues/97))

### v1.6.8 (2021-10-05)
- Implemented migration system for database

### v1.6.7 (2021-10-04)
- Add multiple labels to Docker Compose ([#90](https://github.com/pawelmalak/flame/issues/90))
- Custom icons via Docker Compose labels ([#91](https://github.com/pawelmalak/flame/issues/91))

### v1.6.6 (2021-09-06)
- Added local search (filter) for apps and bookmarks ([#47](https://github.com/pawelmalak/flame/issues/47))

### v1.6.5 (2021-08-28)
- Added support for more URL schemes ([#74](https://github.com/pawelmalak/flame/issues/74))

### v1.6.4 (2021-08-17)
- Added Kubernetes integration ([#72 continued](https://github.com/pawelmalak/flame/issues/72))

### v1.6.3 (2021-08-09)
- Added support for custom SVG icons ([#73](https://github.com/pawelmalak/flame/issues/73))
- Added Deezer and Tidal to search queries

### v1.6.2 (2021-08-06)
- Fixed changelog link
- Added support for Docker API ([#14](https://github.com/pawelmalak/flame/issues/14))

### v1.6.1 (2021-07-28)
- Added option to upload custom icons for bookmarks ([#52](https://github.com/pawelmalak/flame/issues/52))
- Fixed custom icons not updating ([#58](https://github.com/pawelmalak/flame/issues/58))
- Added changelog file

### v1.6 (2021-07-17)
- Added support for Steam URLs ([#62](https://github.com/pawelmalak/flame/issues/62))
- Fixed bug with custom CSS not persisting ([#64](https://github.com/pawelmalak/flame/issues/64))
- Added option to set default prefix for search bar ([#65](https://github.com/pawelmalak/flame/issues/65))

### v1.5 (2021-06-24)
- Added ability to set custom CSS from settings ([#8](https://github.com/pawelmalak/flame/issues/8) and [#17](https://github.com/pawelmalak/flame/issues/17)) (experimental)
- Added option to upload custom icons ([#12](https://github.com/pawelmalak/flame/issues/12))
- Added option to open links in a new or the same tab ([#27](https://github.com/pawelmalak/flame/issues/27))
- Added Search bar with support for 3 search engines and 4 services ([#44](https://github.com/pawelmalak/flame/issues/44))
- Added option to hide applications and categories ([#48](https://github.com/pawelmalak/flame/issues/48))
- Improved Logger

### v1.4 (2021-06-18)
- Added more sorting options. User can now choose to sort apps and categories by name, creation time or to use custom order ([#13](https://github.com/pawelmalak/flame/issues/13))
- Added reordering functionality. User can now set custom order for apps and categories from their 'edit tables' ([#13](https://github.com/pawelmalak/flame/issues/13))
- Changed get all controllers for applications and categories to use case-insensitive ordering ([#36](https://github.com/pawelmalak/flame/issues/36))
- New apps will be placed correctly in the array depending on used sorting settings ([#37](https://github.com/pawelmalak/flame/issues/37))
- Added app version to settings with option to check for updates manually ([#38](https://github.com/pawelmalak/flame/issues/38))
- Added update check on app start ([#38](https://github.com/pawelmalak/flame/issues/38))
- Fixed bug with decimal input values in Safari browser ([#40](https://github.com/pawelmalak/flame/issues/40))

### v1.3 (2021-06-14)
- Added reverse proxy support ([#23](https://github.com/pawelmalak/flame/issues/23) and [#24](https://github.com/pawelmalak/flame/issues/24))
- Added support for more url formats ([#26](https://github.com/pawelmalak/flame/issues/26))
- Added ability to hide main header ([#28](https://github.com/pawelmalak/flame/issues/28))
- Fixed settings not being synchronized ([#29](https://github.com/pawelmalak/flame/issues/29))
- Added auto-refresh for greeting and date ([#34](https://github.com/pawelmalak/flame/issues/34))

### v1.2 (2021-06-10)
- Added simple check to the weather module settings to inform user if the api key is missing ([#2](https://github.com/pawelmalak/flame/issues/2))
- Added ability to set optional icons to the bookmarks ([#7](https://github.com/pawelmalak/flame/issues/7))
- Added option to pin new applications and categories to the homescreen by default ([#11](https://github.com/pawelmalak/flame/issues/11))
- Added background highlight while hovering over application card ([#15](https://github.com/pawelmalak/flame/issues/15))
- Created CRON job to clear old weather data from the database ([#16](https://github.com/pawelmalak/flame/issues/16))
- Added proxy for websocket instead of using hard coded host ([#18](https://github.com/pawelmalak/flame/issues/18))
- Fixed bug with overwriting opened tabs ([#20](https://github.com/pawelmalak/flame/issues/20))

### v1.1 (2021-06-09)
- Added custom favicon and changed page title ([#3](https://github.com/pawelmalak/flame/issues/3))
- Added functionality to set custom page title ([#3](https://github.com/pawelmalak/flame/issues/3))
- Changed messages on the homescreen when there are apps/bookmarks created but not pinned to the homescreen ([#4](https://github.com/pawelmalak/flame/issues/4))
- Added 'warnings' to apps and bookmarks forms about supported url formats ([#5](https://github.com/pawelmalak/flame/issues/5))

### v1.0 (2021-06-08)
Initial release of Flame - self-hosted startpage using Node.js on backend and React on frontend.
