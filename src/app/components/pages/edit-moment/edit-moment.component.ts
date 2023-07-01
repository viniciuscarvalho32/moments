import { MessagesService } from './../../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { Input } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = "Editar";
  formData!: FormData;

  constructor(
    private momentService: MomentsService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })


  }

  async editHandler(momentData: Moment) {

    const id = this.moment.id;
    const formData = new FormData();
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)
    if (momentData.image) {
        formData.append('image', momentData.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe({
      next: () => {
        this.messagesService.add(`Momento ${id} foi atualizado com sucesso!`)
        this.router.navigate(['/'])
      }
    })
  }
}
