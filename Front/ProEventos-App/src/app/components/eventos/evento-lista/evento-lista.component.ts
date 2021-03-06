import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  widthImg: number = 100;
  marginImg: number = 2;
  showImage: boolean = true;
  public eventoId = 0;

  private _filterList: string = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.carregarEventos();

  }

  public toggleImage(): void {
    this.showImage = !this.showImage;
  }
  public carregarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error("Erro ao carregar", "Erro!")
      },
      complete: () => this.spinner.hide(),
    });
  }

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList
      ? this.filterEvents(this.filterList)
      : this.eventos;
  }

  filterEvents(by: string): Evento[] {
    by = by.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(by) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(by) !== -1
    );
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: string)=>
      {
          this.toastr.success(`O evento  foi deletado com sucesso!', 'Deletado!`);
              this.carregarEventos();

      },
      (erro)=> {
        this.toastr.error("N??o foi possivel deletar");

        console.log(erro)
      }
    ).add(()=> {this.spinner.hide();});

  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number ):void {

    this.router.navigate([`/eventos/detalhe/${id}`]);


  }

}
