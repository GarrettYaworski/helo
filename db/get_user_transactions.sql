SELECT * FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE u.user_id = $1