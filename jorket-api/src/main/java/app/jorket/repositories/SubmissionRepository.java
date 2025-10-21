package app.jorket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import app.jorket.entities.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
} 
