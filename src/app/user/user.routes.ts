import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { LogoutComponent } from './logout.component'

export const userRoutes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
]