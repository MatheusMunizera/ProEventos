using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IGeralPersist //criar todas as chamadas de persistencia
    {
        //GERAL -> 
         void Add<T>(T entity) where T: class;
         void Update<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         void DeleteRange<T>(T entity) where T: class;

         Task<bool> SaveChangesAsync();

         
         
    }
}