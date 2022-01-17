using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // [Required]

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        
        public int Id { get; set;}
        public string Local { get; set;}
        public string DataEvento { get; set;}  //? faz poder ser nulo

        [
        Required(ErrorMessage = "O Campo {0} é obrigatório"), // vai pegar o nome do campo {0} atual
        // MinLength(3, ErrorMessage = "{0} deve ter ao minimo 4 caracteres"),
        // MaxLength(50, ErrorMessage = "{0} só pode ter ao máximo 50 caracteres")
        StringLength(50,MinimumLength =3, ErrorMessage = "{0} deve conter de 3 a 50 caracteres")
        ]
        public string Tema { get; set;}

        [Range(1,120000), Required]
        public int QtdPessoas { get; set;}

        [RegularExpression(@"[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$")]
        public string ImagemURL { get; set;}

        [Required, Phone]
        public string Telefone { get; set; }

        [EmailAddress, Required]
        public string Email { get; set; }
         public IEnumerable<LoteDto> Lotes { get; set; }
         public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
         public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}