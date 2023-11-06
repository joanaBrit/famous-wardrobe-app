## General-Assembly Project 4

# Famous Wardrobe

Famous Wardrobe is a tailor-made experience for those seeking celebrity-inspired outfits, especially for people with limited time to select the perfect garment for special occasions.  This solo project is a full-stack application designed for fashion enthusiasts, using React, Sass, Bootstrap, Django and Python.  

#### Timeframe

A solo full-stack project completed in 12 days.


## Ready to dive into the world of fashion and celebrities?

[Famous Wardrobe](https://famous-wardrobe-app-2f2d9032945c.herokuapp.com/)


## Technologies Used

### Installation:

* Install back-end dependencies: pipenv, django, pylint, autopep8,  django rest_framework, simplejwt.
* Enter Shell for project: pipenv shell.
* Make Migrations: python manage.py makemigrations.
* Migrate: python manage.py migrate.
* Seed data: python manage.py to dumpdata / flush / loaddata.
* Start back-end server: python manage.py runserver.
* Install front-end dependencies: npm create React app, Sass, Bootstrap, React-router-dom, Pillow, Axios.
* Start front-end server: npm start.
* Heroku command to deploy.

### Development Tools:

* Figma
* Trello Board
* Quick database diagrams
* Cloudinary
* Github
* Insomnia 
* TablePlus
* Google Chrome dev tools
* Neon
* Heroku

### Back-end:

* Django
* Python
* Django REST framework
* Simple Jwt
* Pillow

### Front-end:

* React
* Axios
* Sass
* React Router Dom
* React Bootstrap


## Brief

* Building a full-stack application.
* Create your Python Django API using Django REST framework to serve data from a postgres database.
* Developing a separate frontend using React to consume the API.
* Be a complete app with multiple relationships and CRUD (Create, Read, Update, Delete) functionality for at least a couple of models.
* Implementation thoughtful user stories and wireframes.
* Ensuring the project is deployed online for public accessibility.

#### Necessary Deliverables:

* Working App hosted on the internet.
* A link to my hosted app in the URL section of my Github repository.
* A Git repository hosted on Github.
* Frequent commits dating back to the very beginning.


## Planing

I initially conceived this idea for a group project, but we didn't proceed with it. So I decided it would be a great fit for my final solo project. Driven by my passion for fashion, this app aims to help people save time and reduce the stress of finding the perfect outfit for special occasions. It also has a celebrity-inspired aspect to it. How many times have we watched something on TV and thought, ‘This looks fantastic, I'd love to have a similar piece?’ The app addresses that very idea.

### Wireframe Plan:

My idea for the design was to create a visual experience that not only serves its functional purpose but also reveals an artistic and fashionable charm. I created my design plan using Figma.

![Figma](<readmeimg/Wireframe.png>)

### Project Management on Trello:

I organised tasks according to what I needed to do, separating them by days to keep myself on track and push myself. I began by creating a comprehensive project plan on Trello. To ensure a structured approach, I prioritised backend development initially. This decision was influenced by our recent learning of Django, allowing me to build a strong foundation before diving into frontend tasks, where I felt more comfortable and experienced. Overall, it helped me see what was missing and ensured I stayed on the right path to complete the minimum requirements.

![Trello](<readmeimg/Trello.png>)

### Database Diagram:

I used quick database diagrams to create a visual representation of my database structure, making it easier to understand the organisation of data.

![Database Diagram](<readmeimg/Q Diagram.png>)


## Project Breakdown

### Day 1 - Project Planning and Initialization:

On this day, the focus was on completing the project planning. I initiated by creating a repository for the application and installing the necessary start points for both the backend and frontend development. Furthermore, I began the search for data, including images of celebrities' outfits and the corresponding garments.

### Day 2-4 - Backend Development

This was my first experience working with Python in the backend. I used Django and Django REST framework to create a PostgreSQL database with RESTful functionalities. My journey began with dedicating time to understand Django more profoundly and conducting extensive research.

Once I felt prepared, I created my apps and models. I needed to integrate Pillow to handle image fields. Developing views with generics proved to be a simpler approach compared to previous methods. I then transitioned to visualise the data using TablePlus and testing in Insomnia, ensuring I received the correct JSON responses. I established the necessary paths and seeded the database with the final dataset.

![Table Plus](<readmeimg/TableP.png>)

Additionally, I implemented permissions for users to update and delete the reviews they created. I also had plans to create another permission system where a certain number of likes on a user's review would grant them permission to add celebrities' outfits. This would allow content control and improve community engagement. Unfortunately, due to time limitations, I couldn't implement this feature, but it's a focus for future development.

While establishing a relationship between the garment app model and celebrities, I encountered an error related to the 'id' field, which required at least one argument. Despite exploring various approaches, including changing names and resending data, the solution turned out to be adding a new column to the database specifically for celebrities. This resolved the issue and allowed for a seamless data population.

![ID Error](<readmeimg/Id error.png>)

### Day 5 - 12  Frontend Development

I was ready to move on to my front-end. Connected my backend and created an env file for handling the Cloudinary. Created the navigation routes. 
I used Axios for the data requests from the back-end. Created an API request library that was imported onto each relevant page. 

I set up user authentication for login and registration. Created a file to manage tokens (both access and refresh tokens). Configured Axios with interceptors to modify HTTP requests and responses. 

```javascript

import axios from 'axios'
import { getToken, setToken, tokenIsValid } from './auth'

const axiosAuth = axios.create()


//  Interceptors - intercept every request sent with axiosAuth
axiosAuth.interceptors.request.use(async (config) => {

  if (!tokenIsValid('famous-access-token')) {
    if (tokenIsValid('famous-refresh-token')) {
      const { data } = await axios.post('/api/auth/refresh/', {
        refresh: getToken('famous-refresh-token'),
      })
      setToken('famous-access-token', data.access)

    } else {
      throw new axios.Cancel('Session expired, please login again.')
    }
  }

  config.headers.Authorization = `Bearer ${getToken('famous-access-token')}`
  return config
})

export default axiosAuth

```

When I began testing, I encountered an error indicating a lack of necessary credentials for authenticated pages, even having the token. After some time, I discovered that the token had expired an hour ago, which was not accurate. The issue was related to the project’s time zone settings, initially set to UTC. Changing it to 'none' resolved the problem.

![Time Error](<readmeimg/Time error.png>)

I continued working on other pages, particularly the one displaying celebrity outfits. These images were presented in a carousel format featuring three images at a time, with an auto generated carousel. Access to this page was available to all users, with the aim of capturing their attention for further content. The garments were displayed using a Bootstrap modal, where the images were overlaid by content. Access to this page was restricted to logged-in users.

There is a reviews page where users can create reviews, and this page requires authentication. Additionally, users can access all reviews for specific celebrity outfits and provide likes to other users’ reviews. Users who have created a review will have access to icons on the review page, allowing them to easily update or delete their reviews.

I am planning to introduce some changes to make this page more user-friendly. One of the changes is including the respective celebrity picture, which will enhance the user's ability to understand and visualise the content of the reviews. 

I created a dynamic navbar for easy page navigation. It changes based on whether a user is logged in or not. To make it more user-friendly, I added titles to the navbar and ensured that the respective page name is displayed when switching between pages. This was achieved by splitting the paths and assigning the desired names.


```javascript

function getPageTitle(path) {
  const subpaths = path.split('/')
  if (subpaths[1] === 'celebrities') {
    if (subpaths[3] === 'reviews') {
      return 'Reviews'
    } else if (subpaths[3] === 'garments') {
      return 'Garment Details'
    } else if (subpaths[3] === 'create-review') {
      return 'Create new review'
    } else {
      return 'Celebrities'
    }
  } else if (subpaths[1] === 'register') {
    return 'Register'
  } else if (subpaths[1] === 'login') {
    return 'Login'
  } else {
    return 'Famous Wardrobe'
  }
}

```


## Final Product

### Home Page:

![Home Page](<readmeimg/H page.png>)

![Modal Page](<readmeimg/M page.png>)

### Login Page:

![Login Page](<readmeimg/L page.png>)

![Error Handling](<readmeimg/L Error Handling.png>)

### Register Page:

![Register Page](<readmeimg/R page.png>)

### Celebrities Page:

![Celebrities Page](<readmeimg/C page.png>)

### Garments Page:

![Garments Page](<readmeimg/G page.png>)

![Garment Display](<readmeimg/hover G.png>)

### Reviews Page:

![Reviews Page](<readmeimg/RW page.png>)

### Create Review Page: 

![Create Review](<readmeimg/C RW page.png>)

![Review Features](<readmeimg/RW features.png>)

### Not Found Page: 

![Not Found Page](<readmeimg/Not F page.png>)


### Wins

1. **Full-Stack App:** Creating a functional full-stack app represents a significant achievement. Constructing the entire application myself provided a profound learning experience. 

2. **Backend Development:** I'm glad that I invested time in understanding and researching Django. This investment not only saved time but also enriched my perspective, and I can genuinely say that I found the development process enjoyable.

3. **User Friendly:** User's experience was a central goal. As a result, I integrated features like 'likes' at various points in the app, and I enabled users to create, update, and delete reviews.

4. **Problem Solving:** The ability to address challenges, including the time zone one, demonstrates problem-solving skills and a strong determination to overcome obstacles.


### Challenges

1. **Time Zone Error:** It took some time, research and a few tries, but I eventually resolved it with a simple change on the project setting change the time zone to 'none'.

2. **User Authentication:** Implementing user authentication posed a challenge, as it often resulted in new errors. However, with practice and learning from these errors, I successfully addressed this challenge


### Key Learnings

During the backend development, I gained an understanding of relational databases and Python. Working with Django was particularly enjoyable, as it proved to be a quick and effective framework. 

I highlighted the importance of having a well thought out plan in place before embarking on a project.

Deploying the project for the second time on Heroku improved my confidence. I became more adept at handling different branches and the deployment process.


### Bugs

I haven't encountered any specific bugs in the project. However, I want to improve the navigation. For example, when creating a review, it would be more intuitive if the system directed me to the review created rather than the celebrity's page. Additionally, the Register page could provide clearer error messages.


### Future Improvements

* User permission to add celebrity image -  Introduce a new permission system where users with more than 10 likes on a review can add images of celebrities’ outfits.
* User profile - Create user profiles that allow users to have more control over what they have liked, reviewed, or contributed.
* Celebrity outfit categories - Expand the variety of celebrity outfits by categorising them into different types. This will provide users a range of outfit choices to explore.
* Different price range -  Offering both "Expensive" and "Affordable." garment pieces will make it easier for users to find outfits that match their financial preferences.