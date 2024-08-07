# og-generation
This is an assignment for a fullstack position intern.

## Video
[Screencast from 07-08-24 10:35:00 AM IST.webm](https://github.com/user-attachments/assets/aecaf021-12d1-4e6b-b4f8-589286bf9d3e)



## Processing
1) Client makes a post request for submitting a post
2) Backend receives the post and makes a post in the db with null values for og_image_url and offloads the work to kafka and returns the response to client back with post data with null values for images and og_image.  Optimistic handling is being done in ui.
3) Kafka sends the req to appropriate function and generates a og image and and uploads to cloudinary.
4) the meta tags for og:image is being set dynamically for each post page.

## Things to take care
1) when initially visiting the production link,it will take near about 50 seconds because backend is hosted on a free tier plan on render.
2) you will have to refresh the page after 2 seconds to get the og_image_url.
