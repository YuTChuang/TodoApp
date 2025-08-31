using TodoApp.Domain.Entities;
using TodoApp.Domain.Interfaces;

namespace TodoApp.Application.Services;

public class TodoService
{
    private readonly ITodoRepository _repo;

    public TodoService(ITodoRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<Todo>> GetAllAsync() => _repo.GetAllAsync();
    public Task<Todo?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task<Todo> AddAsync(Todo todo) => _repo.AddAsync(todo);
    public Task UpdateAsync(Todo todo) => _repo.UpdateAsync(todo);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
}
