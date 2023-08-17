const db = require('./db');
const calculations = require('./calculations');

function calculateTotalAmount(bookId, quantity, callback) {
    db.get('SELECT rental_price FROM Book WHERE book_id = ?', [bookId], (err, row) => {
        if (err) {
            return callback(err);
        }
        if (!row) {
            return callback(new Error('Book not found'));
        }

        const rentalPrice = row.rental_price;
        const totalAmount = quantity * rentalPrice;

        callback(null, totalAmount);
    });
}

function createTransaction(customerId, bookId, quantity, callback) {
    calculateTotalAmount(bookId, quantity, (err, totalAmount) => {
        if (err) {
            return callback(err);
        }

        const query = `
            INSERT INTO RentalTransaction (customer_id, book_id, rental_start_date, rental_end_date, total_rental_fee, payment_status, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

      
        const currentDate = calculations.getCurrentISODate();
        const rentalStartDate = currentDate;
        const rentalEndDate = currentDate;
        const paymentStatus = 'Pending';
        const status = 'Active';

        db.run(
            query,
            [customerId, bookId, rentalStartDate, rentalEndDate, totalAmount, paymentStatus, status],
            function (err) {
                if (err) {
                    return callback(err);
                }
                const transactionId = this.lastID;
                callback(null, transactionId, totalAmount);
            }
        );
    });
}

module.exports = {
    calculateTotalAmount,
    createTransaction
};
