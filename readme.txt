TASK: https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view

How to run the app: For install modules use: npm install. For start the application use: npm start

Database snapshot: When user create account, firebase creates collection with ID. When user add task for day,
firebase creates document with ID (ID = number day). Each document has collections with random ID,
in this collection we have task from user.

Application stack: SCSS module, typescript, react-redux, react-saga, classnames, MUI, react-icons, nanoid, firebase.

src
    Components - React components
        containers - components for the Application, 
                    each folder has component.tsx and styles.modules.scss
        Shared - components from MUI, react-icons
    constants - folder consists of .ts - we have constants for the application,
                variables.scss - scss variables for the application
    function - folder consists of .ts functions - for the application
    hooks - folder consists of .ts react customs hooks
    pages - folder consists of components. The components use in the application for crete pages.
    store - store for redux and saga 
        reducers - reducers for the application
        saga - saga for the application
                        