# PlanningPirates

## Description

A planning poker type app with a pirate theme.

## Features

- Clerk authentication
- PusherJS realtime updates
- Next.js 13 server actions and server components
- Drizzle ORM
- Neon serverless Postgres

## Installation

### Prerequisites

- pnpm
- Node

### Setup

```bash
# Clone the repository
git clone https://github.com/klstein7/planningpirates.git

# Navigate to the project directory
cd planningpirates

# Install dependencies
pnpm i

# Setup environment variables
export DATABASE_URL=your_database_url
export PUSHER_APP_ID=your_pusher_app_id
export NEXT_PUBLIC_PUSHER_KEY=your_next_public_pusher_key
export PUSHER_SECRET=your_pusher_secret
export NEXT_PUBLIC_PUSHER_CLUSTER=your_next_public_pusher_cluster
export OPENAI_API_KEY=your_openai_api_key
export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_next_public_clerk_publishable_key
export CLERK_SECRET_KEY=your_clerk_secret_key
export NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
export NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-in
export OPENAI_FINE_TUNED_MODEL=your_openai_fine_tuned_model

# Run the project
pnpm dev
```

## Contributing

Contributions are always welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Open a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Authors

- [@klstein7](https://www.github.com/klstein7)
