import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Note } from 'src/app/note.model';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  noteId: number;
  form: FormGroup;
  editMode = false;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let title: String = '';
    let content: String = '';

    this.route.params.subscribe((params: Params) => {
      this.noteId = +params['id'];
      this.editMode = params['id'] ? true : false;
    });

    if (this.editMode) {
      const currentNote = this.noteService.getNote(this.noteId);
      title = currentNote.title;
      content = currentNote.content;
    }

    this.form = new FormGroup({
      title: new FormControl(title),
      content: new FormControl(content),
    });
  }

  passFormData() {
    if (this.editMode) {
      this.noteService.updateNote(this.form.value, this.noteId);
    } else {
      this.noteService.addNewNote(this.form.value);
    }
  }
}
