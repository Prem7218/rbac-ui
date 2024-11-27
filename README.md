
* Role Based Access Control System:
* ## View1[*]: https://rbac-ui-ebon.vercel.app/
* ## View2[*]: https://rbac-system-j4yj.onrender.com/

## [*] Create Using: React JS, Java-Script, Mock API

# [*] We Use Server For Mock Data Running: 
    (1) Roles [3001] json-server --watch db.json --port 3001
    (2) Users [3001] json-server --watch db.json --port 3001

# [*] and React localhost://5173 [npm run dev]

# [Hosting]: 1) Vercel & Render [ Frontend (React JS) ]....
# [Hosting]: 2) Glitch for Mock API Data [ Backend (db.js) ]....

## [*] Folder Structure: rbac-ui/

├── index.html
├── src/
│   ├── api/
│   │   ├── users.js
│   │   └── roles.js
|   ├── assets/
│   │   ├── back-ground.png
│   │   └── background.png
│   ├── components/
│   │   ├── UserTable.jsx
│   │   ├── RoleForm.jsx
│   │   ├── UserForm.jsx
|   |   ├── Header.jsx
│   │   └── PermissionsEditor.jsx
│   ├── context/
│   │   └── RBACContext.jsx
│   ├── pages/
│   │   ├── UsersPage.jsx
│   │   └── RolesPage.jsx
│   ├── App.jsx
|   ├── App.css
│   ├── main.jsx
│   └── index.css
├── db.json
├── .gitignore
├── package-lock.json
├── package.json
├── tailwind.config.js
├── README.md
├── postcss.config.js
└── vite.config.js


1. This Application Helps to get Control Access Of User By Interative Feature's & CRUD Operation's.
2. We Uses Mock Data Which Create When New User Automatically Added By Us then next select Access for then.
3. there are [ Write, Read, Delete ] Three Type of Access Controll From Our Side.
4. Using This ABCS you get save min you 60-70% time to interact with data base, because all CRUD are Perform on Direct Using UI [ User Interface ].
# and Many More...
