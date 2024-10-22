import React from 'react'

const Home = React.lazy(() => import('./views/admin/home/Home'));
const FrontEnd = React.lazy(()=> import('./views/admin/front-end/Frontend'))
const BackEnd = React.lazy(()=> import('./views/admin/back-end/Backend'))
const Database = React.lazy(()=> import('./views/admin/database/Database'))
const Other = React.lazy(()=> import('./views/admin/other/Other'))
const Settings = React.lazy(()=> import('./views/admin/settings/Settings'))
const QuestionDetails = React.lazy(()=> import('./views/admin/question-details/QuestionDetails'))
const QuestionEdit = React.lazy(()=> import('./views/admin/question-edit/QuestionEdit'))
const UserEdit = React.lazy(()=> import('./views/admin/user-edit/UserEdit'))
const Profile = React.lazy(()=> import('./views/admin/profile/Profile'))

const routes = [
    { path: '/home', name: 'Home', element: Home },
    { path: '/front-ent', name: 'FrontEnd', element: FrontEnd },
    { path: '/back-end', name: 'BackEnd', element: BackEnd },
    { path: '/database', name: 'Database', element: Database },
    { path: '/other', name: 'Other', element: Other },
    { path: '/settings', name: 'Settings', element: Settings },
    { path: '/question-details/:questionId', name: 'Question Details', element: QuestionDetails },
    { path: '/question-edit/:category/:questionId', name: 'Question Edit', element: QuestionEdit },
    { path: '/user-edit/:userId', name: 'User Edit', element: UserEdit },
    { path: '/profile', name: 'User Profile', element: Profile },
]

export default routes