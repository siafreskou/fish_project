# VeriFish application 

VeriFish app is a responsive web application providing access to a wealth of fish-related information by leveraging the knowledge base and the corresponding services of VeriFish project. 
The application will support users in finding useful information about fishes in their area, including-but not limited to- morphometrics, environmental,
stock and food-related information.

## How to Run

### Using the source

- Step 1: Open a terminal (Command Prompt, PowerShell, or a UNIX terminal) and run:
`git clone https://github.com/siafreskou/fish_project.git`
- Step 2: Navigate into the project directory:
`cd fish_project`
- Step 3: Run the following command to install all required npm packages:
`npm install`
- Step 4: To run the project locally, use:
`npm start`
Runs the app in the development mode.\
Open [http://localhost:3000/veriFish/] to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Using Docker

- Step 1: Open a terminal (Command Prompt, PowerShell, or a UNIX terminal) and run:
`git clone https://github.com/siafreskou/fish_project.git`
- Step 2: Navigate into the project directory:
`cd fish_project`
- Step 3: Create the docker image
`docker build -t verifish-app`
- Step 4: Start the corresponding container
`docker run -p 3000:3000 verifish-app`

## Handling CORS Issues

- Step1: Create a Chrome Shortcut on Desktop:
   - Open the "Start Menu" and search for "Google Chrome".
   - Right-click on Chrome and select "Open File Location".
   - Right-click on `chrome.exe` and select "Create Shortcut".
   - If prompted, click "Yes".

- Step2: Modify Chrome Shortcut Properties:
   - Right-click on the newly created Chrome shortcut.
   - Click "Properties".
   - Go to the "Shortcut" tab.
   - Locate the "Target" field.

   By default, it should look like this:
   ```
   "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
   ```

-Step 3: Add Flags to Disable Web Security:
   Modify the "Target" field by adding these flags at the end:
   ```
   "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"
   ```
   Note: Make sure there's a space before `--disable-web-security`.
   - Click "Apply" and then "OK".


## Available Scripts

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
