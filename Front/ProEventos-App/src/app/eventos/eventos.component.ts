import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
   widthImg: number = 100;
  marginImg: number = 2;
  showImage: boolean = true;
  private _filterList: string = '';






  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  public toggleImage(){
    this.showImage = !this.showImage;
  }
  public getEventos(): void{

    this.http.get(`https://localhost:5001/api/eventos`).subscribe(
      Response => {
        this.eventos = Response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }

  public get filterList(): string{
    return this._filterList;
    }


  public set filterList(value: string){
      this._filterList = value;
      this.eventosFiltrados = this.filterList ? this.filterEvents(this.filterList) : this.eventos;
    }

   filterEvents(by: string): any{
    by = by.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string;}) => evento.tema.toLocaleLowerCase().indexOf(by) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(by) !== -1
    )
  }


}
