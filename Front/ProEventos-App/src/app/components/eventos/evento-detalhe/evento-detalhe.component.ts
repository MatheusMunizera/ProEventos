import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;


  get f(): any{
    return this.form.controls;
  }


  
  constructor(private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.validation();
  }


  public validation():void{
    this.form = this.formBuilder.group
    (
      {//validators required faz o campo ser obrigatorio
        tema: ['',    [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        local: ['', Validators.required],
        dataEvento: ['', Validators.required],
        qtdPessoas: ['',[Validators.required, Validators.max(12000)]],
        telefone: ['', Validators.required],
        email: ['',[ Validators.required, Validators.email]],
        imagemURL: ['', Validators.required],
      }
    );
  }

  public resetForm(): void {
    this.form.reset();
  }
}

