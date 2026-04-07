package com.studentreel.platform.repository;

import com.studentreel.platform.entity.Task;
import com.studentreel.platform.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByDueDateAsc(Long userId);
    List<Task> findTop5ByUserIdOrderByDueDateAsc(Long userId);
    long countByUserIdAndDueDate(Long userId, LocalDate dueDate);
    long countByUserIdAndStatus(Long userId, TaskStatus status);
}
