import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { TermsComponent } from './pages/terms/terms.component';
import { WebStoriesComponent } from './pages/web-stories/web-stories.component';

export const routes: Routes = [
      { path: '', component: HomeComponent },
  { path: 'web-stories', component: WebStoriesComponent },
  { path: 'surveys', component: SurveysComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
];
