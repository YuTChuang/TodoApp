using TodoApp.Application.Services;
using TodoApp.Domain.Entities;
using TodoApp.Domain.Interfaces;
using Moq;

public class TodoServiceTests
{
    [Fact]
    public async Task AddAsync_Should_Return_Added_Todo()
    {
        // Arrange
        var mockRepo = new Mock<ITodoRepository>();
        var newTodo = new Todo { Title = "Test" };
        mockRepo.Setup(r => r.AddAsync(It.IsAny<Todo>())).ReturnsAsync(newTodo);
        var service = new TodoService(mockRepo.Object);

        // Act
        var result = await service.AddAsync(newTodo);

        // Assert
        Assert.Equal("Test", result.Title);
    }
}
