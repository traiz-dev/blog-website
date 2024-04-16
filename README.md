# Blog Website

This is a simple blog website where users can post, login/register, delete posts, and edit posts. The frontend is built with `React.js` and the backend is built with `Python`, powered by `Flask`.

<img width="1499" alt="Screenshot 2024-04-16 at 20 17 49" src="https://github.com/traiz-dev/blog-website/assets/66207820/e0f51c8d-1727-4364-8da0-2831a5eb20b1">

## Features

- **User Authentication**: Users can register and login securely to access the blog features.
- **Create Posts**: Authenticated users can create new blog posts.
- **Edit Posts**: Users can edit their own posts after creation.
- **Delete Posts**: Users can delete their own posts.

## Technologies Used

- **Frontend**: `Vite` + `React.js`
- **Backend**: `Python`, `Flask`
- **Database**: `SQLite`
- **Styling**: `CSS`

## Setup Instructions

1. **Clone the Repository**:

```
git clone https://github.com/traiz-dev/blog-website.git
cd blog-website
```

2. **Install Dependencies**:

```
cd front-end
npm install
cd ../back-end
pip install -r requirements.txt
```

3. **Start the Development Servers**:

```
cd front-end
npm start
cd ../back-end
python main.py
```

4. **Access the Website**:
Open your browser and navigate to `http://localhost:[PORT]` to view the blog website.

## Folder Structure

- **fron-tend/**: Contains the `Vite` + `React.js` frontend code.
- **back-end/**: Contains the `Python`, `Flask` backend code.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
