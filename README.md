# Personal Website

This is my personal website! I've tried to make it a cozy corner of the Internet filled with tidbits of who I am as a person.

## Features
* An interactive home page with about, work, and contact sections
* A custom guestbook where visitors can plant a flower in my digital garden and leave me a message
* A markdown-based blogging system built on file-based routing to track all of my ideas
    * Blog includes a tagging system to organize posts and make them easier to find
* Lots of interactive, hand drawn animations to make my site fun!

## Tech Stack
A list of the toools used to build my website:
1. Astro.js
    * Main framework used to built my static site
2. React
    * Used to built the guestbook as it required client-side components
3. Tailwind CSS v4
    * Used for all of the styling
4. Framer Motion
    * Handled all of the animations and UI transitions
5. Firestore Firebase
    * The backend database to securely store guestbook messages
6. [Shiki](https://shiki.style/)
    * Provided beautiful syntax highlighting for codeblocks in my field notes/blog
7. [rehype-external-links](https://github.com/rehypejs/rehype-external-links)
    * A plugin used to automatically make all of my markdown links open in new tabs

## Developer Log (for Hack Club's Sleepover event!)
This is an hour by hour log of everything I worked on and when each feature was implemented.

1. Mostly project set up
    * Set up project repo + Astro boilerplate
    * Set up README file with the project log
    * Created the Tailwind CSS custom styling palette
    * Set up page navigation
    * Home pag hero section [WIP] (edit: completed)
    * Mostly spend this time acclimating to the new framework as I've never used Astro before
2. Finished page navigation
    * Added navbar fade in animation (reponsive on web and mobile)
    * Tweaked the homepage hero section design
    * Created a reusable layout for the rest of the pages and imported it in
3. Tweaking page navigation and building work page
    * Created cutting board background for `work.astro`
    * Made background transition + navbar transition
4. Updated navigation bar and logo
    * Created favicon and logo for the navbar
    * Added tilt animation for RT image
    * Fixed the navigation bar formatting so that it stays permanent
    * Added navbar text animations to fade into white vs. gray so that it is visible
5. More navbar animations + hero section work
    * Added 5/6 hero images (still looking for the work section one)
    * Added a changing word bank for the "endlessly ___" part of the navbar
        * Just a fun feature to make the site more interactive!
    * Animated home page images so that on hover they zoom in + tilt towards the center!
6. Fixed up hero section (99% done)
    * Added a vinyl scroll down button (this took an embarrasingly long amount of time)
    * Added a fade in animation for the hero section text
    * Page elements float to their spots!
    * Created a dummy about me section
7. Finalized hero section, started about me section
    * Added fun polaroid image hover effect for hero text
    * Drafted introduction for about me section
    * Removed the about me page and redirected all of the links to about me section of homepage
8. Created a RecordCrate component for the about section
    * Finalized description for left side column
    * Created a swipe through crate for users to explore my favorite records!
    * Added hyper links to descriptions and the same hover effect as hero section
9. Finished about me section, started selected works section of home page
    * Added the hyper link effect for about me
    * Created SelectedWorks.jsx to show the museum gallery style works
10. Working on museum project gallery
    * Added locking scroll effect using timelines and Matter
    * Designed picture frames for each of my selected works
    * Added project descriptions
    * Created fade in & out animations controlled by mouse scroll
11. Finalized selected works project gallery and started contact
    * Added tilt animation to picture frames
    * Added "explore the rest of my projects" button
    * Started designing project footer/contact element
12. Still working on the tinkering projects section (sorry this is taking a long time!)
    * Figured out how to get elements to fly off screen and look scattered
    * Created a desk layout with a cutting mat
    * [WIP] manually setting the position of each element is taking forever and will probably continue into the next hour (edit: completed)
13. Finally finished selected works section!
    * Finished manually positioning desktop items (i might add more later)
    * Made elements draggable and more interactive
    * Began coding the footer/contact section
14. Finished contact section
    * Created `Contact.jsx` component
    * Relinked the hero navigation section and navbar to contact section
    * Added get in touch message + other social icons
    * Added a simple footer at the bottom of every page
15. Wrapping up home page design
    * Fixed bug where the footer was overlapping with the navigation bar when it was open
    * Changed the design of the selected project frames so that it looks more cohesive with my website
    * Added more items to my desk top section
    * Brainstormed ideas for the guestbook! (the most exciting feature imo)
    * Realized the dummy CV failed to upload from before so I readded it in
16. Started working on guestbook feature
    * Made the navbar automatically close after clicking a link
    * Decided on a garden where users can send me a meessage!
    * Created the new page & title
    * Created hover effect on flowers to view who planted them
    * [WIP] Finding flower images to upload (edit: completed)
    * [WIP] Setting up message upload system (edit: completed)
17. Working on `Guestbook.tsx`
    * Selected flower images for my digital garden
    * Created send a message feature and side panel box
    * ~~[WIP] Linking my Spotify so people can recommend songs~~ (edit: canceled)
18. Continued working on the guestbook
    * Added sorting algorithm that creates new pages if too many messages are sent
    * Tested sorting algorithm with dummy message entries
    * Added option for users to submit their websites as well
    * Set up Firebase for storing the actual messages
19. Wrapped up Guestbook features!
    * Added Spotify dropdown feature
        * Registered on the Spotify Developer Dashboard to get my client ID and API tokens
        * Linked my Spotify account via Spotify API to add guestbook recs to a playlist
        * Learned how to set up ngrok to test locally
        * Realized I can't use the Spotify API because I don't have premium
            - This led me to scrap this feature but I spent pretty much all of this hour trying to figure it out implement it
    * Fixed up some Firebase issues, guestbook is ready!
20. Started working on field notes page
    * Figured out organization & layout
    * Built a blog feature
        * Automatically updates the index when a new file is added to the blogposts folder of this project
        * Created reusable blog post layout which renders Markdown
        * Had to change FieldNotes file to Typescript to get it to work
21. Finished up blog post feature
    * Fixed the Markdown rendering for each blogpost by creating a test template
        * Added a custom code snippet styling theme (rose-pine-dawn)
    * Installed `rehype-external-links` to automatically open all links in a new tab
    * Added a back button to blog posts to take you to main field notes page
22. Rerouted links in navbar and fixed Selected Works link error
    * Decided to delete separate work page
    * Created a tagging feature for my field notes instead and linked that in the selected works feature
    * Started selected works project writeups (for ditch explorer, new leaf, and pocketpix)
    * Fixed hero & navbar navigation to redirect to the works section instead of works page
23. Set up analytics with [Umami](https://umami.is/)
    * Super simple to set up - just deployed my site on Vercel
    * Added to Umami dashboards
    * Error with perms for firebase once app was actually deployed, fixed those
        * Added my env variables to my Vercel project
    * Did some file cleanup for unnecessary files
24. Finishing touches
    * Updated README
    * Added loading in animations for field notes page
25. Made site responsive!
    * Fixed homepage so that the text stays centered and hero navigation becomes horizontal on mobile
    * Fixed the about section to reduce padding and center text
    * Tweaked selected works to remove animations on mobile and make it clearere
    * Reduced text size on mobile of the contact section

---
<div align="center">

### Made with ♡ by Revati Tambe.
</div>