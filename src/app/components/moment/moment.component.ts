import { CommentsService } from 'src/app/services/comments.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MomentsService } from 'src/app/services/moments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/Comment';
import { MessagesService } from 'src/app/services/messages.service';
import { faTimes, faEdit, faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment!: Moment;
  comments?: Comment[] = [];
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes
  faEdit = faEdit
  commentForm!: FormGroup;

  constructor(
    private momentsService: MomentsService,
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private messageService: MessagesService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentsService
        .getMoment(id)
        .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required])
    });
  }
    get text() {
      return this.commentForm.get('text')!
    }
    get username() {
      return this.commentForm.get('username')!
    }

  async onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
        return
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

  await this.commentsService
            .createComment(data)
            .subscribe((comment) =>
                  this.moment!.comments!.push(comment.data))
            this.messageService.add('Comentário adicionado com sucesso!');
            this.commentForm.reset();
    formDirective.resetForm(this.commentForm);
  }
  removerHandler(id: number) {
    this.momentsService.removeMoments(id).subscribe({
      next: () => {
        this.messageService.add('Momento apagado com sucesso!')
        this.router.navigate(['/'])
      }
    })
  }
}
