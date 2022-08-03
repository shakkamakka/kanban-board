# Kanban Board

A minimal Kanban board on which you can create, view and move tickets between columns.
The data will be saved locally in your browser thanks to HTML5 localstorage.


![image](src/assets/kanban-board.gif "image")

[demo on Netlify](https://voluble-gumdrop-534720.netlify.app/) ** note that editing the data will only work locally as we're using a fake (json-)server.

**How to use**
- On first use, some dummy data will be loaded into the tickets on the board and onto your browser.
- You can edit a ticket by doubleclicking the card, this will open an editable form which you can save.
- You can drag a ticket from one to another column
- You can delete a ticket by clicking on the bin icon in the right corner
- You can add as many tickets as you want!

**Stack**

- React ^18.2.0(Vite boilerplate)
- React-router-dom 6
- Typescript
- Sass
- Json-server 

**How to run the code**

After downloading the repository you can open the terminal at the root of the repo and run the code by first installing dependencies and then start the scripts.

- npm install
- npm start

The application will run in localhost on port 5173 [http://localhost:5173/](http://localhost:5173/)
