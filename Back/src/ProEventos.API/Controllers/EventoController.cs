using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        
        public IEnumerable<Evento> _evento =   new Evento[]{
               new Evento(){ EventoID = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "São Paulo - SP",
                Lote = "Lote 1",
                QtdPessoas = 20,
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                ImageURL = "foto.png"
               },
                 new Evento(){ EventoID = 2,
                Tema = "NodeJS e MongoDB",
                Local = "São Paulo - SP",
                Lote = "Lote 1",
                QtdPessoas = 100,
                DataEvento = DateTime.Now.AddDays(30).ToString(),
                ImageURL = "foto.png"
               }
            };
        public EventoController()
        {
           
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(evento => evento.EventoID == id);
        }

          [HttpPost]
        public string Post()
        {
            return "value POST";
        }
    }
}
