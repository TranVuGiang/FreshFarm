CREATE DATABASE FRESHFARM
INSERT INTO [dbo].[users] ([name], [email], [email_verified_at], [password], [remember_token], [created_at], [updated_at])
VALUES 
('Nguyen Van A', 'nguyenvana@example.com', '2025-01-20 10:30:00', 'hashed_password_1', 'token_12345', '2025-01-20 09:00:00', '2025-01-20 09:30:00'),
('Tran Thi B', 'tranthib@example.com', NULL, 'hashed_password_2', 'token_67890', '2025-01-20 11:00:00', '2025-01-20 11:30:00'),
('Le Van C', 'levanc@example.com', '2025-01-21 08:45:00', 'hashed_password_3', 'token_abcde', '2025-01-21 08:00:00', '2025-01-21 08:45:00'),
('Pham Thi D', 'phamthid@example.com', NULL, 'hashed_password_4', NULL, '2025-01-21 09:15:00', '2025-01-21 09:45:00'),
('Hoang Van E', 'hoangvane@example.com', '2025-01-22 07:30:00', 'hashed_password_5', 'token_fghij', '2025-01-22 07:00:00', '2025-01-22 07:30:00');
