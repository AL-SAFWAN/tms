CREATE DATABASE IF NOT EXISTS tms_db;
USE tms_db;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('Requester', 'Helpdesk Agent', 'SysAdmin') NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Open', 'In Progress', 'Resolved') NOT NULL,
    priority ENUM('Low', 'Medium', 'High') NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolution_date DATETIME,
    requester_id INT NOT NULL,
    assigned_agent_id INT,
    FOREIGN KEY (requester_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_agent_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    commented_by_id INT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(id),
    FOREIGN KEY (commented_by_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE ActivityLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type ENUM('Create', 'Read', 'Update', 'Delete') NOT NULL,
    activity_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    details TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (id, username, email, role, password_hash) VALUES
(1, 'Admin', 'admin@example.com', 'SysAdmin', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(2, 'Jane', 'jane.doe@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(3, 'John', 'john.smith@example.com', 'Helpdesk Agent', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(4, 'Sophia', 'sophia.martinez@example.com', 'Helpdesk Agent', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(5, 'Alex', 'alex.johnson@example.com', 'Helpdesk Agent', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(6, 'Emily', 'emily.white@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(7, 'Michael', 'michael.brown@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(8, 'Chloe', 'chloe.taylor@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(9, 'David', 'david.wilson@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(10, 'James', 'james.anderson@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q'),
(11, 'Isabella', 'isabella.thomas@example.com', 'Requester', '$2b$12$M1Vs.iRo1Ctp8xwBxLULpu/q7kfLBhMCVNZUXRxacRmUd4uAGGi9q');

INSERT INTO Tickets (title, description, status, priority, creation_date, resolution_date, requester_id, assigned_agent_id) VALUES
('Password Reset', 'Requesting a password reset for my account.', 'Open', 'Medium', NOW(),NULL, 9, NULL),
('Login Issue', 'Cannot log in to the account with my usual password.', 'Open', 'Medium', NOW(), NULL, 2, 4),
('Email Sync Problem', 'Emails are not syncing on my mobile device.', 'In Progress', 'High', NOW(), NULL, 6, 3),
('Software Installation', 'Need new project management software installed.', 'Resolved', 'Medium', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 3 DAY, 7, 5),
('Printer Not Working', 'The printer on the 3rd floor is not working.', 'Open', 'Low', NOW(), NULL, 8, NULL),
('Password Reset', 'Requesting a password reset for my account.', 'Resolved', 'Low', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 1 DAY, 9, 1),
('Update Contact Information', 'My contact information needs to be updated in the system.', 'In Progress', 'Low', NOW(), NULL, 10, 5),
('VPN Connectivity Issue', 'Having trouble connecting to the VPN from home.', 'Resolved', 'High', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 5 DAY, 1, 1),
('Laptop Overheating', 'My laptop has been overheating very frequently.', 'Open', 'High', NOW(), NULL, 11, NULL),
('Software License Renewal', 'Our software license is about to expire.', 'In Progress', 'Medium', NOW(), NULL, 2, 4),
('Access to Shared Folder', 'Need access to the shared project folder.', 'Resolved', 'Low', NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 2 DAY, 6, 5);


INSERT INTO Comments (ticket_id, commented_by_id, creation_date, description) VALUES
-- Ticket 1: Login Issue
(2, 2, NOW(), "I cannot log into my account, even though I\'m sure my password is correct."),
(2, 4, NOW() + INTERVAL 1 HOUR, "Have you tried resetting your password?"),
(2, 2, NOW() + INTERVAL 2 HOUR, 'Password reset done, but still can not log in.'),
(2, 4, NOW() + INTERVAL 3 HOUR, 'It seems like a technical issue. We are investigating further.'),

-- Ticket 2: Email Sync Problem
(3, 6, NOW(), "My emails won't sync on my phone anymore."),
(3, 3, NOW() + INTERVAL 1 HOUR, "Can you check if your email app is updated to the latest version?"),
(3, 6, NOW() + INTERVAL 2 HOUR, 'App is updated, still having issues.'),
(3, 3, NOW() + INTERVAL 3 HOUR, 'We will reset your email sync settings from our end.'),

-- Ticket 3: Software Installation
(4, 7, NOW(), "I need the new project management software installed on my workstation."),
(4, 5, NOW() + INTERVAL 1 HOUR, "The software has been installed. Please verify its functioning on your end."),
(4, 7, NOW() + INTERVAL 2 HOUR, 'Software installed and working fine. Thanks!'),
(4, 5, NOW() + INTERVAL 3 HOUR, 'Glad to hear! Let us know if there is anything else we can help with.'),

-- Ticket 4: Printer Not Working
(5, 8, NOW(), "The printer on the 3rd floor is jamming again."),
(5, 1, NOW() + INTERVAL 1 HOUR, "We will send someone to take a look."),
(5, 8, NOW() + INTERVAL 2 HOUR, 'Any update on the printer?'),
(5, 1, NOW() + INTERVAL 3 HOUR, 'Maintenance has fixed the issue. Please try printing again.'),

-- Ticket 5: Password Reset
(6, 9, NOW(), "I need a password reset link."),
(6, 1, NOW() + INTERVAL 1 HOUR, "A password reset link has been sent to your email."),
(6, 9, NOW() + INTERVAL 2 HOUR, 'Reset successful, I can access my account now. Thank you!'),
(6, 1, NOW() + INTERVAL 3 HOUR, 'You are welcome! If you have any more issues, feel free to reach out.'),

-- Ticket 6: Update Contact Information
(7, 10, NOW(), "My contact information is outdated in the system. Can it be updated?"),
(7, 5, NOW() + INTERVAL 1 HOUR, "Your contact information has been updated."),
(7, 10, NOW() + INTERVAL 2 HOUR, 'I checked, and the information looks correct now. Thanks!'),
(7, 5, NOW() + INTERVAL 3 HOUR, 'No problem, happy to help!'),

-- Ticket 7: VPN Connectivity Issue
(8, 1, NOW(), "I\'m having trouble connecting to the VPN from home."),
(8, 1, NOW() + INTERVAL 1 HOUR, "The issue has been resolved. Please try connecting again."),
(8, 1, NOW() + INTERVAL 2 HOUR, 'VPN is working perfectly now. What was the issue?'),
(8, 1, NOW() + INTERVAL 3 HOUR, 'There was a temporary server glitch. We have taken steps to prevent it in the future.'),

-- Ticket 8: Laptop Overheating
(9, 11, NOW(), "My laptop has been overheating. What should I do?"),
(9, 1, NOW() + INTERVAL 1 HOUR, "Please bring it to the IT department for a check-up."),
(9, 11, NOW() + INTERVAL 2 HOUR, 'Will do. Should I bring it in today or tomorrow?'),
(9, 1, NOW() + INTERVAL 3 HOUR, 'Today would be best. We want to ensure it does not cause more issues for you.'),

-- Ticket 9: Software License Renewal
(10, 2, NOW(), "Our software license expires next week."),
(10, 4, NOW() + INTERVAL 1 HOUR, "I\'ve processed the renewal. You should not experience any disruption."),
(10, 2, NOW() + INTERVAL 2 HOUR, 'Great, thanks for handling this so quickly!'),
(10, 4, NOW() + INTERVAL 3 HOUR, 'You are welcome! Always here to help.'),

-- Ticket 10: Access to Shared Folder
(11, 6, NOW(), "I need access to the shared project folder."),
(11, 5, NOW() + INTERVAL 1 HOUR, "You\'ve been granted access. Please verify."),
(11, 6, NOW() + INTERVAL 2 HOUR, 'Access confirmed. Can I get edit permissions as well?'),
(11, 5, NOW() + INTERVAL 3 HOUR, 'Edit permissions granted. You should be all set now.');


INSERT INTO ActivityLogs (user_id, activity_type, activity_date, details) VALUES
-- Helpdesk Agent actions
(3, 'Read', NOW(), 'viewing assigned tickets'),
(4, 'Update', NOW() + INTERVAL 1 DAY, 'updated ticket 2'),
(9, 'Create', NOW(), 'created ticket 1'),
(8, 'Update', NOW() + INTERVAL 1 DAY, 'updated ticket 7'),
(5, 'Read', NOW() + INTERVAL 2 DAY, 'viewing all tickets'),

-- Admin actions
(1, 'Delete', NOW(), 'deleted ticket 4'),
(1, 'Delete', NOW() + INTERVAL 2 DAY, 'deleted comment 4'),

-- Requester actions
(2, 'Create', NOW(), 'created a comment on ticket 2'),
(6, 'Read', NOW() + INTERVAL 1 DAY, 'viewing ticket 3'),
(7, 'Update', NOW() + INTERVAL 2 DAY, 'updated comment 5'),
(9, 'Create', NOW() + INTERVAL 1 DAY, 'created ticket 5'),
(10, 'Read', NOW() + INTERVAL 2 DAY, 'viewing ticket 6'),
(11, 'Update', NOW(), 'updated ticket 8');