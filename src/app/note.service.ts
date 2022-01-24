import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notesModified = new Subject<Note[]>();
  private notes: Note[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {}

  getNotes() {
    return this.notes;
  }

  getNote(id: number) {
    return this.notes[id];
  }

  afterChangeBehaviour(note: Note) {
    note.date = new Date();
    this.notesModified.next([...this.notes]);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateNote(updatedNote: Note, id: number) {
    this.notes[id] = updatedNote;
    this.afterChangeBehaviour(this.notes[id]);
    this.setLocalStorage();
  }

  addNewNote(newNote: Note) {
    this.notes.push(newNote);
    this.afterChangeBehaviour(newNote);
    this.setLocalStorage();
  }

  deleteNote(id: number) {
    this.notes.splice(id, 1);
    this.notesModified.next([...this.notes]);
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  getLocalStorage() {
    const localStorageData: Note[] = JSON.parse(localStorage.getItem('notes'));
    localStorageData.forEach((data) => (data.date = new Date(data.date)));

    if (localStorageData) this.notes = localStorageData;
  }
}
