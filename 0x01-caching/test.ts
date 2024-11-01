import * as readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

// Function to mask input while typing
const hiddenQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdin.resume();
    stdout.write(query);

    stdin.setRawMode(true); // Enable raw mode for masking input
    let input = '';

    stdin.on('data', (key) => {
      const keyPressed = key.toString();
      
      if (keyPressed === '\n' || keyPressed === '\r' || keyPressed === '\u0004') {
        stdin.setRawMode(false);
        stdin.pause();
        stdout.write('\n');
        resolve(input);
      } else if (keyPressed === '\u0003') { // Handle Ctrl+C
        stdin.setRawMode(false);
        stdin.pause();
        process.exit();
      } else {
        if (/\d/.test(keyPressed)) {
          input += keyPressed;
          stdout.write('*'); // Mask the password with "*"
        }
      }
    });
  });
};

// Ask for the numeric password
hiddenQuestion('Enter your numeric password: ')
  .then((password) => {
    if (/^\d+$/.test(password)) {
      console.log('Password accepted:', password);
    } else {
      console.log('Invalid password! It must contain only numeric characters.');
    }
    rl.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    rl.close();
  });

