const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const db = new sqlite3.Database('library.db');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function insertCustomer() {
    rl.question('Enter first name: ', firstName => {
        rl.question('Enter last name: ', lastName => {
            rl.question('Enter email: ', email => {
                rl.question('Enter phone number: ', phoneNumber => {
                    rl.question('Enter address: ', address => {
                        rl.question('Enter membership type: ', membershipType => {
                            rl.question('Enter preferred genres: ', preferredGenres => {
                                const query = `
                                    INSERT INTO Customer (first_name, last_name, email, phone_number, address, membership_type, preferred_genres)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)
                                `;

                                db.run(query, [firstName, lastName, email, phoneNumber, address, membershipType, preferredGenres], err => {
                                    if (err) {
                                        console.error('Error inserting customer:', err.message);
                                    } else {
                                        console.log('Customer inserted successfully.');
                                    }
                                    rl.close();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function insertBook() {
    rl.question('Enter title: ', title => {
        rl.question('Enter author: ', author => {
            rl.question('Enter genre: ', genre => {
                rl.question('Enter ISBN: ', isbn => {
                    rl.question('Enter description: ', description => {
                        rl.question('Enter published year: ', publishedYear => {
                            rl.question('Enter rental status: ', rentalStatus => {
                                rl.question('Enter rental price: ', rentalPrice => {
                                    const query = `
                                        INSERT INTO Book (title, author, genre, isbn, description, published_year, rental_status, rental_price)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                    `;

                                    db.run(query, [title, author, genre, isbn, description, publishedYear, rentalStatus, rentalPrice], err => {
                                        if (err) {
                                            console.error('Error inserting book:', err.message);
                                        } else {
                                            console.log('Book inserted successfully.');
                                        }
                                        rl.close();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

rl.question('Insert data for (1) Customer or (2) Book? Enter the number: ', choice => {
    if (choice === '1') {
        insertCustomer();
    } else if (choice === '2') {
        insertBook();
    } else {
        console.log('Invalid choice.');
        rl.close();
    }
});
                      