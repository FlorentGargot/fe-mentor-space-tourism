import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrewComponent } from "./crew/crew.component";
import { DestinationComponent } from "./destination/destination.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { TechnologyComponent } from "./technology/technology.component";

const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'destination', component: DestinationComponent},
    {path: 'crew', component: CrewComponent},
    {path: 'technology', component: TechnologyComponent}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule]
})
export class AppRoutingModule {

}