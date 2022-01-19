import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form!: FormGroup;
  locale = 'pt-br';
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-blue',
      showWeekNumbers: false,
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use(this.locale);
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Não foi possivel carregar');
          console.log(error);
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  ngOnInit() {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      //validators required faz o campo ser obrigatorio
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl) {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar == 'post') {
        this.evento = { ...this.form.value };

        this.eventoService.post(this.evento).subscribe(
          (result) => {
            this.toastr.success('Evento salvo com sucesso');
          },
          (error) => {
            this.spinner.hide(),
              console.error(error, this.toastr.error('Erro ao salvar', 'Erro'));
          },
          () => {
            this.spinner.hide();
          }
        );
      } else {
        this.evento = { id: this.evento.id, ...this.form.value };

        this.eventoService.put( this.evento).subscribe(
          (result) => {
            this.toastr.success('Evento salvo com sucesso');
          },
          (error) => {
            this.spinner.hide(),
              console.error(error, this.toastr.error('Erro ao salvar', 'Erro'));
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    }
  }
}
