![Julienne Logo](/logo.svg)
# Julienne: A Lab Management Program
Julienne, in it's current state, is a native desktop program intended for inventory, task automation and analytics. The system uses electronJS and ReactJS to interface with Google Firebase for serverless cloud data storage, user authentication and custom functions.

The ReactJS component will also be available for use as a web portal however it will have more limited administrative controls. Users will be able to quickly navigate the inventory system and perform basic create, read, update and delete functions. Inventory initialization will have to take place using the desktop platform.

Contents |
------------ | 
[Cloning](https://github.com/BSickler/julienne#cloning) |
[Changelog](https://github.com/BSickler/julienne#changelog) |
[Features Roadmap](https://github.com/BSickler/julienne#features-roadmap) | 


## Cloning
The Firebase API key and variables are held in a .env file. If cloning the repo be sure to create a **.env** file, in the **root** folder, for your keys using the following format:
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_CONFIRMATION_EMAIL_REDIRECT=
```

## Changelog
Version | Date
---------| -------
[0.2b](https://github.com/BSickler/julienne#version-02b) | 30 Mar 2019
[0.2a](https://github.com/BSickler/julienne#version-02a) | 23 Dec 2018

 ### Version: 0.2b
 - Implemented ReactRouter for navigational controls
 - New Dependencies: PrimeReact, PrimeIcons, PrimeFlex
 - Removed Dependencies: Foreman
 - ElectronJS will now hot reload correctly
 - ElectronJS distribution build is now functional
 - Reworked the inventory page, adding CardDeck and DataTree components for inventory viewing
 
 ### Version: 0.2a
 - Basic skeletal framework
 - Firebase API
	* User Authentication
	* Inventory read
 - Adjusted electron.js script to use react build files if available
 - Added account e-mail authentication, automated sign-up, sign-in, password reset and change password forms
 - Created an entirely overly convoluted means of navigating the inventory object.

## Features Roadmap
### Implemented
#### Account
- Basic function
- Firebase API hook
- E-mail authentication
- Sign-in/out Page
- Sign-up Form
- Password reset function

#### Admin
- Basic Inventories portal
- Basic Users portal

#### Home
- Home page component

#### Inventory
- Firebase API hook
- Card deck viewing model
- Data tree viewing model
- Basic toolbar

#### Landing
- Landing page component

#### Navigation
- Navigational bar

 
### Planned
#### Account
- [ ] User settings

#### Admin
- [ ] Add/remove users
- [ ] Analytics Toolset
- [ ] Custom User functions
- [ ] Set user permissions

#### Branding
- [ ] Create program icon/favicon

#### Firebase
- [ ] Add object edit/delete functionality

#### General
- [ ] ElectronJS Firebase setup module
- [ ] Modal API
	* - [ ] Add Breadcrumbs trail
- [ ] UI Styling
- [ ] Add Toolbar to all main page components

#### Inventory
- [ ] Add object detail window
- [ ] Add object edit/delete


	