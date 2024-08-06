function ogTemplate(username, title, content, image) {
  let trimmedContent;
  let trimmedTitle;

  if (image) {
    trimmedContent =
      content.length > 30 ? content.slice(0, 30) + "...." : content;
    trimmedTitle = title.length > 125 ? title.slice(0, 125) + "...." : title;
  } else {
    trimmedContent =
      content.length > 45 ? content.slice(0, 45) + "...." : content;
    trimmedTitle = title;
  }
  const titleFontSize = image ? "3.2rem" : "3.9rem";
  const contetnFontSize = image ? "2rem" : "3.1rem";
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reddit-style Post</title>
      <style>
      body {
        margin: 0; /* Remove default body margin */
      }
        .post-container {
          width: 1200px;
          height: 630px;
          border: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #ffffff;
          border-radius: 1rem;
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .username {
          font-weight: 600;
          font-size: 2.5rem;
          color: #333;
        }
        .post-title {
          position: relative;
          z-index: 2;
          font-size: ${titleFontSize};
          font-weight: 700;
          width: 100%;
          word-break: break-word;
          color: #333;
          padding-bottom:0.3rem
        }
        .post-content {
          position: relative;
          z-index: 2;
          font-size: ${contetnFontSize};
          word-break: break-word;
          color: #4b4b4b;
          max-height: 12rem;
        }
        .post-footer {
          display: flex;
          align-items: center;
        }
        .upvote-count {
          font-size: 1.25rem;
          margin-left: 0.5rem;
          color: #ff4500;
        }
        .post-image {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%; 
          height: 45%;
          object-fit: cover;
          opacity: 0.25; 
        }
      </style>
    </head>
    <body>
      <div class="post-container">
        <div class="post-content-container">
          <div class="post-header">
            <div class="username">${username}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 256 256"
            >
              <g
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <circle cx="45" cy="45" r="45" fill="#FF4500" />
                <path
                  d="M75.011 45c-.134-3.624-3.177-6.454-6.812-6.331-1.611.056-3.143.716-4.306 1.823-5.123-3.49-11.141-5.403-17.327-5.537l2.919-14.038 9.631 2.025c.268 2.472 2.483 4.262 4.955 3.993 2.472-.268 4.262-2.483 3.993-4.955s-2.483-4.262-4.955-3.993c-1.421.145-2.696.973-3.4 2.204L48.68 17.987c-.749-.168-1.499.302-1.667 1.063 0 .011 0 .011 0 .022l-3.322 15.615c-6.264.101-12.36 2.025-17.55 5.537-2.64-2.483-6.801-2.36-9.284.291-2.483 2.64-2.36 6.801.291 9.284.515.481 1.107.895 1.767 1.186-.045.66-.045 1.32 0 1.98 0 10.078 11.745 18.277 26.23 18.277 14.485 0 26.23-8.188 26.23-18.277.045-.66.045-1.32 0-1.98 2.281-1.622 3.702-3.949 3.657-6.477zM30.011 49.508c0-2.483 2.025-4.508 4.508-4.508 2.483 0 4.508 2.025 4.508 4.508s-2.025 4.508-4.508 4.508c-2.494-.023-4.508-2.025-4.508-4.508zm26.141 12.55v-.179c-3.199 2.405-7.114 3.635-11.119 3.468-4.005.168-7.919-1.063-11.119-3.468-.425-.515-.347-1.286.168-1.711.447-.369 1.085-.369 1.544 0 2.707 1.98 6.007 2.987 9.362 2.83 3.356.179 6.667-.783 9.407-2.74.492-.481 1.297-.47 1.779.022.503.481.492 1.286 0 1.767zm-.604-7.718c-.078 0-.145 0-.224 0l.034-.168c-2.483 0-4.508-2.025-4.508-4.508s2.025-4.508 4.508-4.508 4.508 2.025 4.508 4.508c.1 2.472-1.835 4.563-4.318 4.664z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>
          <div class="post-title">${trimmedTitle}</div>
          <div class="post-content">${trimmedContent}</div>
        </div>
        <div class="post-footer">
          <svg
            fill="#000000"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"
            />
          </svg>
          <span class="upvote-count">10</span>
          ${
            image
              ? `<img src="${image}" alt="Post Image" class="post-image" />`
              : ""
          }
        </div>
      </div>
    </body>
  </html>
  
    `;
}

module.exports = ogTemplate;
