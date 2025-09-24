namespace TodoApp.Domain.Entities;

public enum TodoStatus
{
    ToDo = 0,
    InProgress = 1,
    InReview = 2,
    Done = 3
}

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TodoStatus Status { get; set; }
    public DateTime? DueDate { get; set; }
}
