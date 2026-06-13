
--Клиенты, у которых суммарный баланс по всем счетам больше 100 000.

SELECT c.full_name, SUM(a.balance) AS total_balance
FROM bank_client c
JOIN bank_account a ON c.id = a.client_id
GROUP BY c.id, c.full_name
HAVING SUM(a.balance) > 100000;


-- 10 последних операций.

SELECT *
FROM bank_transaction
ORDER BY created_at DESC
LIMIT 10;


-- Сумма списаний по каждому клиенту.

SELECT c.full_name, SUM(t.amount) AS total_debit
FROM bank_client c
JOIN bank_account a ON c.id = a.client_id
JOIN bank_transaction t ON a.id = t.account_id
WHERE t.operation_type = 'DEBIT'
GROUP BY c.id, c.full_name;


-- Клиент с максимальным количеством операций.

SELECT c.full_name, COUNT(t.id) AS operations_count
FROM bank_client c
JOIN bank_account a ON c.id = a.client_id
JOIN bank_transaction t ON a.id = t.account_id
GROUP BY c.id, c.full_name
ORDER BY operations_count DESC
LIMIT 1;