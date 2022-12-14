# LCSD Cultural Programmes Map of Events

# 1. Start Server
  cd server
  node index.js --> Runs at 3001 for Server (5000 is replaced (taken by Universal Plug and Play (UPnP), Port 5000 TCP and Apple AirPlay))

# 2. Start React App
 Start a new Terminal  
 cd .. (back to 2720_project / pwd: /Users/xxx/Desktop/2720_project/2720_project)
 npm start  --> Runs at 3000 for Server

# Debug (If cannot find module)
  Run following cmds in a terminal:
  rm -rf node_modules
  npm install

  or
  npm install --save missing_module_name

- normal user account
  username = test; password = 123456

- admin account
  username = admin; password = admin

### User actions:
- [ ] List all locations in a table as links to single locations, and allow sorting of the table with i) number of events at venue, or ii) min and max traffic speed of road
- [x] ~~Show all locations in a map, with links to each single location [ Suggested APIs: Google Maps, MapBox ]~~
- [ ] Search for locations which contain keywords in the name which will result in a table of location results
- [ ] A separate view for one single location, containing:
  - [x] ~~a map showing the location~~
  - [ ] the location details (events or traffic speed)
  - [ ] user comments, where users can add new comments seen by all other users
- [ ] Add location into a list of user’s favourite locations, and see the list in another view
- [ ] See the username in the top left/right of screen, and be able to log out

### Admin actions:
- [x] ~~Request updated data of events or road names, i.e., reload from the online dataset, without affecting data which does not come from API (e.g., user comments within your app) [ Note: This requirement is cancelled ]~~
- [x] ~~CRUD stored event details or road names in the local database~~
- [ ] CRUD user data (username and password only) in the local database
- [ ] Log out as admin

### Non-user actions:
- [ ] Log in as user with username and password
- [ ] Log in as admin using username and password both as admin
