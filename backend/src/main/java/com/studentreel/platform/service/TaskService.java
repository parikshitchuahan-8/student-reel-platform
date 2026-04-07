package com.studentreel.platform.service;

import com.studentreel.platform.dto.TaskRequest;
import com.studentreel.platform.dto.TaskResponse;
import com.studentreel.platform.entity.Task;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.repository.TaskRepository;
import com.studentreel.platform.repository.UserProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserProfileRepository userProfileRepository;

    public TaskService(TaskRepository taskRepository, UserProfileRepository userProfileRepository) {
        this.taskRepository = taskRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public List<TaskResponse> listTasks(Long userId) {
        return taskRepository.findByUserIdOrderByDueDateAsc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse createTask(TaskRequest request) {
        UserProfile user = userProfileRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Task task = new Task(
                user,
                request.title(),
                request.subject(),
                request.description(),
                request.dueDate(),
                request.status(),
                request.priority(),
                request.progress()
        );

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        task.update(
                request.title(),
                request.subject(),
                request.description(),
                request.dueDate(),
                request.status(),
                request.priority(),
                request.progress()
        );

        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new EntityNotFoundException("Task not found");
        }
        taskRepository.deleteById(taskId);
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getUser().getId(),
                task.getTitle(),
                task.getSubject(),
                task.getDescription(),
                task.getDueDate(),
                task.getStatus(),
                task.getPriority(),
                task.getProgress()
        );
    }
}
