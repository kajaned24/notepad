import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './note-list/note/edit/edit.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note-list/note/note.component';

const routes: Routes = [
  {
    path: 'home',
    component: NoteListComponent,
  },
  { path: 'new', component: EditComponent },
  { path: ':id', component: NoteComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
