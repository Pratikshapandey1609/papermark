# Database Setup Guide

## ✅ Database Status: CONNECTED & READY

Your database is properly configured and all tables exist!

## Database Information

- **Database Name**: `papermark`
- **Host**: `localhost:5432`
- **User**: `postgres`
- **Connection**: ✅ Working

## Important: Understanding the Error

The error you saw:
```
ERROR: relation "papermark" does not exist
SELECT * FROM papermark;
```

This happened because you tried to query a table called "papermark", but **"papermark" is the database name, not a table name**.

## Available Tables

Your database has these tables (models):

### Core Tables
- `User` - User accounts
- `Team` - Teams/organizations
- `Document` - Uploaded documents
- `DocumentVersion` - Document versions
- `DocumentPage` - Individual pages of documents
- `Link` - Shareable links to documents
- `View` - Document view tracking
- `Viewer` - People who viewed documents

### Authentication Tables
- `Account` - OAuth accounts
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

### Feature Tables
- `Dataroom` - Data rooms for multiple documents
- `DataroomDocument` - Documents in data rooms
- `DataroomFolder` - Folders in data rooms
- `Folder` - Document folders
- `Domain` - Custom domains
- `Brand` - Branding settings
- `Agreement` - Legal agreements
- `Feedback` - User feedback
- `Reaction` - Document reactions
- `Conversation` - Chat conversations
- `Webhook` - Webhook configurations
- `RestrictedToken` - API tokens

## How to Query the Database

### Using Prisma Studio (Recommended)

Prisma Studio provides a visual interface to browse your database:

```bash
cd papermark-main
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can:
- Browse all tables
- View data
- Add/edit/delete records
- No SQL knowledge required!

### Using SQL Queries

If you want to use SQL, query the actual table names:

```sql
-- View all users
SELECT * FROM "User";

-- View all documents
SELECT * FROM "Document";

-- View all teams
SELECT * FROM "Team";

-- View all links
SELECT * FROM "Link";

-- View all views (document views)
SELECT * FROM "View";

-- Count documents
SELECT COUNT(*) FROM "Document";

-- Get recent documents
SELECT id, name, "createdAt" FROM "Document" 
ORDER BY "createdAt" DESC 
LIMIT 10;
```

**Note**: Table names are case-sensitive and match the model names in `schema.prisma`

### Using psql (PostgreSQL CLI)

```bash
# Connect to the database
psql -U postgres -d papermark

# List all tables
\dt

# Describe a table
\d "User"

# Query a table
SELECT * FROM "User";

# Exit
\q
```

## Verify Database Setup

Run this command to check if everything is set up correctly:

```bash
cd papermark-main
npx prisma db push
```

Expected output:
```
The database is already in sync with the Prisma schema.
```

## Common Database Commands

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma migrate reset
```

### Generate Prisma Client
```bash
npx prisma generate
```

### View Database Schema
```bash
npx prisma db pull
```

### Create a Migration
```bash
npx prisma migrate dev --name your_migration_name
```

## Troubleshooting

### Issue: "Can't reach database server"
**Solution**: Make sure PostgreSQL is running
```bash
# Check if PostgreSQL is running (Windows)
Get-Service postgresql*

# Start PostgreSQL if not running
Start-Service postgresql-x64-14  # Adjust version number
```

### Issue: "Authentication failed"
**Solution**: Check your credentials in `.env`:
```env
POSTGRES_PRISMA_URL=postgresql://postgres:pratiksha@localhost:5432/papermark
```

### Issue: "Database does not exist"
**Solution**: Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE papermark;

# Exit
\q

# Then run migrations
npx prisma db push
```

## Database Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

Your current connection:
```
postgresql://postgres:pratiksha@localhost:5432/papermark
```

- **User**: postgres
- **Password**: pratiksha
- **Host**: localhost
- **Port**: 5432
- **Database**: papermark

## Next Steps

1. ✅ Database is connected
2. ✅ All tables exist
3. ✅ Ready to use!

You can now:
- Start the development server: `npm run dev`
- Browse the database: `npx prisma studio`
- Create your first user by signing up at `http://localhost:3000/register`

## Quick Test

To verify everything works, try creating a user:

1. Go to `http://localhost:3000/register`
2. Enter your email
3. Check your email for the verification link
4. Click the link to verify
5. You're in!

Then check the database:
```bash
npx prisma studio
```

Navigate to the `User` table and you should see your new user!

