const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('library.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Customer (
            customer_id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone_number TEXT,
            address TEXT,
            membership_type TEXT,
            preferred_genres TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Book (
            book_id INTEGER PRIMARY KEY,
            title TEXT,
            author TEXT,
            genre TEXT,
            isbn TEXT,
            description TEXT,
            cover_image BLOB,
            published_year INTEGER,
            rental_status TEXT,
            rental_price REAL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS RentalTransaction (
            rental_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            book_id INTEGER,
            rental_start_date TEXT,
            rental_end_date TEXT,
            actual_return_date TEXT,
            total_rental_fee REAL,
            payment_status TEXT,
            status TEXT,
            FOREIGN KEY (customer_id) REFERENCES Customer (customer_id),
            FOREIGN KEY (book_id) REFERENCES Book (book_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Notification (
            notification_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            message TEXT,
            notification_date TEXT,
            status TEXT,
            FOREIGN KEY (customer_id) REFERENCES Customer (customer_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Administrator (
            admin_id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone_number TEXT,
            role TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Review (
            review_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            book_id INTEGER,
            rating INTEGER,
            review_text TEXT,
            review_date TEXT,
            FOREIGN KEY (customer_id) REFERENCES Customer (customer_id),
            FOREIGN KEY (book_id) REFERENCES Book (book_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS HelpCenterTicket (
            ticket_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            subject TEXT,
            description TEXT,
            status TEXT,
            assigned_to INTEGER,
            response TEXT,
            response_date TEXT,
            FOREIGN KEY (customer_id) REFERENCES Customer (customer_id),
            FOREIGN KEY (assigned_to) REFERENCES Administrator (admin_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS MobileAppInteractionLog (
            log_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            interaction_type TEXT,
            interaction_date TEXT,
            details TEXT,
            FOREIGN KEY (customer_id) REFERENCES Customer (customer_id)
        )
    `);
});

db.close();