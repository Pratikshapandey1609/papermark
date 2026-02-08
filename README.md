# Papermark - Document Sharing Platform

A modern document sharing platform built with Next.js that allows you to share documents securely with analytics and tracking capabilities.

## Features

- 📄 **Document Sharing** - Share documents without attachments
- 🔐 **Secure Authentication** - Multiple OAuth providers (Google, GitHub) and email authentication
- 📊 **Analytics** - Track document views and engagement
- 🗂️ **Data Rooms** - Organize documents in secure data rooms
- 👥 **Team Collaboration** - Manage teams and permissions
- 📧 **Email Notifications** - SMTP integration for email notifications
- 🔒 **Document Protection** - Password-protected documents
- 💾 **Cloud Storage** - Vercel Blob storage integration

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma ORM
- **Storage:** Vercel Blob Storage
- **Email:** SMTP (Gmail) / Resend
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pratikshapandey1609/papermark.git
cd papermark
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

### 4. Configure Database

Update your PostgreSQL connection string in `.env`:

```env
POSTGRES_PRISMA_URL=postgresql://username:password@localhost:5432/papermark
POSTGRES_PRISMA_URL_NON_POOLING=postgresql://username:password@localhost:5432/papermark
```

### 5. Run database migrations

```bash
npx prisma db push
npx prisma generate
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Authentication Setup

#### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth credentials
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add credentials to `.env`:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

#### GitHub OAuth (Optional)
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Add callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env`:
```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

#### Email Authentication (SMTP)
Configure SMTP settings in `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
```

For Gmail, generate an [App Password](https://myaccount.google.com/apppasswords).

### Storage Setup

#### Vercel Blob Storage
1. Create a Blob store in [Vercel Dashboard](https://vercel.com/dashboard/stores)
2. Copy the token to `.env`:
```env
BLOB_READ_WRITE_TOKEN=your_token_here
NEXT_PUBLIC_UPLOAD_TRANSPORT="vercel"
```

#### Firebase (Optional Alternative)
Firebase can be used for additional features like real-time database, cloud storage, and analytics.

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Register your web app and copy the configuration
3. Add Firebase credentials to `.env`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

See [Firebase Setup Guide](./lib/firebase/README.md) for detailed instructions.

## Project Structure

```
papermark-main/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── datarooms/        # Data room components
│   ├── documents/        # Document components
│   └── ui/               # UI components
├── lib/                   # Utility functions
│   ├── emails/           # Email templates
│   ├── files/            # File handling
│   └── prisma.ts         # Prisma client
├── pages/                 # Pages directory (NextAuth)
│   └── api/auth/         # NextAuth configuration
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database

## Environment Variables

Key environment variables you need to configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `POSTGRES_PRISMA_URL` | PostgreSQL connection string | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Optional |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | Optional |
| `SMTP_HOST` | SMTP server host | Optional |
| `SMTP_USER` | SMTP username | Optional |
| `SMTP_PASS` | SMTP password | Optional |

See `.env.example` for a complete list.

## Features in Detail

### Document Sharing
- Upload PDF, DOCX, and other document formats
- Generate shareable links
- Track views and engagement
- Set expiration dates
- Password protection

### Data Rooms
- Create secure data rooms for multiple documents
- Organize documents in folders
- Manage viewer permissions
- Group-based access control

### Analytics
- View count tracking
- Time spent on documents
- Viewer information
- Geographic data

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Pratikshapandey1609/papermark)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Database Setup for Production
- Use a managed PostgreSQL service (Vercel Postgres, Supabase, etc.)
- Update `POSTGRES_PRISMA_URL` in production environment variables
- Run migrations: `npx prisma db push`

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check connection string format
- Ensure database exists

### OAuth Not Working
- Verify redirect URIs match exactly
- Check client ID and secret are correct
- Ensure OAuth app is not in development mode restrictions

### Email Not Sending
- Verify SMTP credentials
- For Gmail, use App Password, not regular password
- Check `SEND_EMAILS=true` in `.env`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation

## Acknowledgments

Built with ❤️ using Next.js, Prisma, and modern web technologies.

---

**Note:** This is a development setup. For production deployment, ensure all security best practices are followed and sensitive credentials are properly secured.
