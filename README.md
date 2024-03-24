# Next.js 14 Project Template with Built-In Authentication - App Router and Server Actions

This is a template for kickstarting Next.js 14 projects with built-in authentication using NextAuth.

Build full stack application blazingly fast - Change a few lines of code and start creating your own app on top of this template.

## Tech Stack (already built into the template)

- Next.js 14 with App router and Server actions
- TypeScript
- Prisma ORM
- NextAuth authentication
- MongoDB database (default). You can change this if you want.
- Shadcn/UI and tailwind CSS for styling

## Getting Started (5 min)

To get started with this project template, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/vainorantanen/nextjs-14-project-template.git
    ```

2. Navigate into the cloned directory:

    ```bash
    cd nextjs-14-project-template
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables:

    - Create a file `.env` on the application root.
    - Create the `DATABASE_URL` and `NEXTAUTH_SECRET` variables with your database URL and NextAuth secret respectively.
    - `DATABASE_URL=your-database-url`
    - `NEXTAUTH_SECRET=your-secret`

5. Generate Prisma client:

    - The project has a built in simple model for users in the `schema.prisma` file. You can modify this file with the database models you need. At the beginning and every time you change this file you need to generate the prisma client. 

    ```bash
    npx prisma generate
    ```

6. Start the development server:

    ```bash
    npm run dev
    ```

7. Open your web browser and visit `http://localhost:3000` to view the application.

## Project Structure

The project structure is organized as follows:

- `prisma/`: Contains the Prisma database Schema.
- `public/`: Contains static files like images, fonts, etc.
- `src/`: Contains the source code for the application.
- `src/app/`: Contains the main code used in the application. Application routes are all in this folder and can be regocnized by the page.tsx files.
- `src/app/lib/`: Contains server actions, data requests and types used in the app. Almost like the backend endpoint of the application used to get, post and modify data in the application database.
- `src/app/api/`: Contains application APIs.
- `src/app/ui/`: Contains reusable React components.
- `src/components/ui/`: Contains reusable React components from Shadcn/UI.
- `src/lib/`: Contains some tailwind configurations.
- `src/utils/`: Contains database and nextauth configurations.

## Authentication

This template comes with built-in authentication using NextAuth. You can customize the authentication flow by modifying the relevant files in the `app/api/auth/` directory.

For more information on NextAuth, refer to the [NextAuth documentation](https://next-auth.js.org/).

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Your contributions are greatly appreciated!

## License

This project is licensed under the MIT License