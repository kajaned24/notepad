import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[];
  subs: Subscription;
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getLocalStorage();
    this.notes = this.noteService.getNotes();
    this.subs = this.noteService.notesModified.subscribe((notes) => {
      this.notes = notes;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }
}
