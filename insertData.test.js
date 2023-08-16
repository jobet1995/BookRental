const { spawn } = require('child_process');

describe('insertData.js', () => {
    test('Insert customer data', done => {
        const scriptPath = './insertData.js';
        const childProcess = spawn('node', [scriptPath]);

        const customerData = [
            'Jobet',
            'Casquejo',
            'jobet@example.com',
            '7893889283',
            'Embargo',
            'Premium',
            'Pedro pan de Coco',
            '1'
        ];

        let output = '';

        childProcess.stdout.on('data', data => {
            output += data.toString();
            if (output.includes('Enter preferred genres: ')) {
                childProcess.stdin.write(customerData.join('\n') + '\n');
            }
            if (output.includes('Customer inserted successfully.')) {
                childProcess.stdin.end();
            }
        });

        childProcess.on('close', () => {
            expect(output).toContain('Customer inserted successfully.');
            done();
        });
    });

    test('Insert book data', done => {
        const scriptPath = './insertData.js';
        const childProcess = spawn('node', [scriptPath]);

        const bookData = [
            'Sample Book',
            'Author',
            'Fiction',
            '1234567890',
            'Sample description',
            '2022',
            'Available',
            '10.0',
            '2'
        ];

        let output = '';

        childProcess.stdout.on('data', data => {
            output += data.toString();
            if (output.includes('Enter rental price: ')) {
                childProcess.stdin.write(bookData.join('\n') + '\n');
            }
            if (output.includes('Book inserted successfully.')) {
                childProcess.stdin.end();
            }
        });

        childProcess.on('close', () => {
            expect(output).toContain('Book inserted successfully.');
            done();
        });
    });
});
      