const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const db = new sqlite3.Database('library.db');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
        // Insert customer data (existing functionality)
        rl.close();
    } else if (choice === '2') {
        insertBook();
    } else {
        console.log('Invalid choice.');
        rl.close();
    }
});
                          