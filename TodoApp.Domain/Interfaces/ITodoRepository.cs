using TodoApp.Domain.Entities;

namespace TodoApp.Domain.Interfaces;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetAllAsync();
    Task<Todo?> GetByIdAsync(int id);
    Task<Todo> AddAsync(Todo todo);
    Task UpdateAsync(Todo todo);
    Task DeleteAsync(int id);
}
