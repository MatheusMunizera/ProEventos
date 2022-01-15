using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist //criar todas as chamadas de persistencia
    {
       

         //PALESTRANTES

         Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
         Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
         Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos);
         
    }
}