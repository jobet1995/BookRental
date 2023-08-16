const express = require('express');
const db = require('./db');
const calculations = require('./calculations');

const router = express.Router();

router.get('/books', (req, res) => {
    db.all('SELECT * FROM Book', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.get('/books/:book_id', (req, res) => {
    const bookId = req.params.book_id;
    db.get('SELECT * FROM Book WHERE book_id = ?', [bookId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(row);
    });
});

router.get('/customers', (req, res) => {
    db.all('SELECT * FROM Customer', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.get('/customers/:customer_id', (req, res) => {
    const customerId = req.params.customer_id;
    db.get('SELECT * FROM Customer WHERE customer_id = ?', [customerId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(row);
    });
});

router.post('/rentals', (req, res) => {
    const { customer_id, book_id, rental_start_date, rental_end_date } = req.body;
    const rentalPrice = 10;
    const total_rental_fee = calculations.calculateRentalFee(rental_start_date, rental_end_date, rentalPrice);
    const payment_status = 'Pending';
    const status = 'Active';

    db.run(
        'INSERT INTO RentalTransaction (customer_id, book_id, rental_start_date, rental_end_date, total_rental_fee, payment_status, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [customer_id, book_id, rental_start_date, rental_end_date, total_rental_fee, payment_status, status],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ rental_id: this.lastID });
        }
    );
});

router.get('/reviews', (req, res) => {
    db.all('SELECT * FROM Review', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.get('/books/:book_id/reviews', (req, res) => {
    const bookId = req.params.book_id;
    db.all('SELECT * FROM Review WHERE book_id = ?', [bookId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.post('/reviews', (req, res) => {
    const { customer_id, book_id, rating, review_text } = req.body;
    const review_date = calculations.getCurrentISODate();

    db.run(
        'INSERT INTO Review (customer_id, book_id, rating, review_text, review_date) VALUES (?, ?, ?, ?, ?)',
        [customer_id, book_id, rating, review_text, review_date],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ review_id: this.lastID });
        }
    );
});

module.exports = router;
      