import { Routes } from '@angular/router';
import { WrapperComponent } from './shared/layouts/wrapper/wrapper.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'chat',
    component: WrapperComponent,
    children: [],
  },
  // Unknown url
  { path: '**', redirectTo: 'not-found' },
];
